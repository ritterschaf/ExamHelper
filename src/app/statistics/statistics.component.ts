import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Question} from '../questions/questions.model';
import {QuestionService} from '../questions/question.service';
import {StatisticService} from './statistic.service';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
    answers: any[] = [];
    subscription: Subscription;
    statisticQuestionSub: Subscription;
    questions: Question[];

    deletable = false;
    right: number;
    wrong: number;
    amount: number;

    constructor(
        private questionService: QuestionService,
        private statisticservice: StatisticService,
        private alertCtrl: AlertController) {
        this.subscription = this.statisticservice.getValues().subscribe(message => {

            if (message) {
                console.log('message:', message);
                this.answers.push(message);
                this.right = this.answers[0].a[0];
                this.wrong = this.answers[0].a[1];
                this.amount = Number(this.right) + Number(this.wrong);
                this.showStastistic();
            } else {
                // clear answers when empty received
                this.answers = [];
            }
        });
    }

    ngOnInit() {
        this.statisticQuestionSub = this.questionService.getQuestions().subscribe(newData => {
            this.questions = newData;
            console.log('I was updated!');
        });
    }

    // ngOnDestroy() {
    //   this.subscription.unsubscribe();
    // }

    generateStatistic(rights, wrongs) {
        this.questions = this.questionService.getAllQuestions();
        // soll das Statistik in Richtung "Sie haben 5 von 6 Fragen richtig"
        // oder was in Richtung Diagramm...???

        rights = 4;
        wrongs = 2;
        this.right = rights;
        this.wrong = wrongs;
        this.amount = rights + wrongs;


    }

    deleteQuestion(text: string) {
        this.alertCtrl.create({
            header: 'Are you sure?',
            message: 'Do you really want to delete?',
            buttons: [
                {
                    text: 'Yes!',
                    handler: () => {
                        this.questionService.deleteQuestion(text);
                    }
                },
                {
                    text: 'No.',
                    role: 'cancel'
                }
            ]
        }).then(alertEl => {
            alertEl.present();
        });
    }

    showStastistic() {

        // show diagram or whatever

        // clip questions array:

        this.questions = this.questions.filter(quest => {
            if (quest.rights >= 5) {
                return quest;
            }

        });
        this.deletable = true;
        // if there are questions with rights > 5
        // this.deletable = true.
        // show list of questions with rights > 5
        // and ask to delete them
        // if yes, call deleteQuestion from questionService
    }

}
