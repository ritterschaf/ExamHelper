import {Component, OnInit, OnDestroy} from '@angular/core';
import {QuestionService} from './question.service';
import {Question} from './questions.model';
import {AlertController} from '@ionic/angular';
import * as vexflow from 'vexflow';
import {Observable, Subscription} from 'rxjs';
import {KatexOptions} from 'ng-katex';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit, OnDestroy {
    // questionSub: Subscription;
    questions: Question[];
    toBeChecked: Question;

    equation: string;
    ques: string;
    ansA: string;
    ansB: string;
    ansC: string;
    ansD: string;
    type: string;

    constructor(
        private questionService: QuestionService,
        private alertCtrl: AlertController
    ) {
        // this.questionSub = this.questionService.updateQuestions().subscribe(newData => {
        //     this.questions.push(newData);
        //     console.log('I was updated!');
        // });

    }

    ngOnInit() {
        this.questions = this.questionService.getAllQuestions();

    }

    ngOnDestroy(): void {
        // this.questionSub.unsubscribe();
    }

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
            this.questions = this.questionService.saveQuestion(array);
        }
    }

    checkQuestion(que, answer) {
        this.toBeChecked = this.questionService.checkQuestion(que, answer);

        if (this.toBeChecked.answerA === answer) {
            this.alertCtrl.create({
                header: 'Your answer was...',
                message: '...correct! Yay!',
                buttons: [{text: 'Yay!', role: 'cancel'}]
            }).then(alertEl => {
                alertEl.present();
            });
        } else {
            this.alertCtrl.create({
                header: 'Your answer was...',
                message: '...wrong. Sorry.',
                buttons: [{text: 'Next time.', role: 'cancel'}]
            }).then(alertEl => {
                alertEl.present();
            });
        }
    }

    saveSheetValue(value) {
        console.log('Sheet Value is: ' + value);
        this.questionService.updateSheetValue(value);
    }

}
