import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {QuestionService} from './question.service';
import {Question} from './questions.model';
import {AlertController, IonSlides} from '@ionic/angular';
import {StatisticService} from '../statistics/statistic.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit, OnDestroy {
    questionSub: Subscription;
    public boxes = 'questionbox';

    questions: Question[];
    toBeChecked: Question;

    private rightAnswers: number;
    private wrongAnswers: number;

    @ViewChild('examslider', {static: false}) examslider: IonSlides;

    slideOpts = {
        slidesPerView: 1,
        lockSwipes: true,
        allowTouchMove: false,
        lockSwipeToNext: true,
        lockSwipeToPrev: true,
    };

    equation: string;
    ques: string;
    ansA: string;
    ansB: string;
    ansC: string;
    ansD: string;
    type: string;

    constructor(
        private questionService: QuestionService,
        private alertCtrl: AlertController,
        private statisticService: StatisticService
    ) {
        this.questionSub = this.questionService.getQuestions().subscribe(newData => {
            this.questions = newData;
            console.log('I was updated!');
        });

    }

    // gets questions when it is initialized and subscribes to database.
    ngOnInit() {
        // this.questions = this.questionService.jsonload();
        // this.questions = this.questionService.getAllQuestions();
        this.questionService.jsonload();
        this.rightAnswers = 0;
        this.wrongAnswers = 0;
        // this.questionService.getDatabaseState().subscribe(ready => {
        //     if (ready) {
        //         // perform actions...like e.g. getting questions from db.
        //         this.questionService.getQuestions().subscribe(array => {
        //             console.log('questions from db: ', array);
        //             this.questions = array;
        //         });
        //     }
        // });


    }

    ngOnDestroy(): void {
        this.questionSub.unsubscribe();
    }

    endExam() {
        console.log('You chose to end the exam. Right: ' + this.rightAnswers + ' and Wrong: ' + this.wrongAnswers);
        this.statisticService.generateStatistic(this.rightAnswers, this.wrongAnswers);
        this.rightAnswers = 0;
        this.wrongAnswers = 0;
    }

    switch(box) {
        this.boxes = box;
    }

    radioSelect(event) {
        console.log('radio: ', event.detail.value);
        this.type = event.detail.value;
    }

    jsonload() {
        this.questionService.jsonload();
        // this.questionService.getAllQuestions();
    }

    // gets the input data, compiles it into an array and gives this so saveQuestions in the service
    saveQuestion() {
        console.log(this.type);
        if (this.ques === undefined || this.ques === '' ||
            this.ansA === undefined || this.ansA === '' ||
            this.ansB === undefined || this.ansB === '' ||
            this.ansC === undefined || this.ansC === '' ||
            this.ansD === undefined || this.ansD === '') {

            this.alertCtrl.create({
                message: 'Fill out all the fields.',
                buttons: [{text: 'Back', role: 'cancel'}]
            }).then(alertEl => {
                alertEl.present();
            });
            return;
        } else {
            if (this.type === undefined) {
                this.type = 'text';
            }
            const array: string[] = [this.ques, this.ansA, this.ansB, this.ansC, this.ansD, this.type];
            console.log(array);
            // this.questions = this.questionService.saveQuestion(array);
            this.questionService.saveQuestion(array);
        }
    }

    // this checks the question and gives out an alert to inform you
    checkQuestion(que, answer) {
        this.toBeChecked = this.questionService.checkQuestion(que, answer);

        if (this.toBeChecked.answerA === answer) {
            this.rightAnswers = this.rightAnswers + 1;
            this.questionService.updateRights(que);
            console.log(this.rightAnswers);
            // this.alertCtrl.create({
            //     header: 'Your answer was...',
            //     message: '...correct! Yay!',
            //     buttons: [{text: 'Yay!', role: 'cancel'}]
            // }).then(alertEl => {
            //     alertEl.present();
            //
            // });
        } else {
            this.wrongAnswers = this.wrongAnswers + 1;
            console.log(this.wrongAnswers);
            // this.alertCtrl.create({
            //     header: 'Your answer was...',
            //     message: '...wrong. Sorry.',
            //     buttons: [{text: 'Next time.', role: 'cancel'}]
            // }).then(alertEl => {
            //     alertEl.present();
            // });
        }
        // let slider advance
        // and save values!

        // this.examslider.lockSwipes(false);
        this.examslider.slideNext(500);
        // this.examslider.lockSwipes(true);
    }


    sendToStatistic() {
        this.statisticService.generateStatistic(this.rightAnswers, this.wrongAnswers);
    }

    clearStatistic(): void {
        this.statisticService.clearValues();
    }


}
