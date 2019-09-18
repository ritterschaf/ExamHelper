import {Component, OnInit, OnDestroy} from '@angular/core';
import {QuestionService} from './question.service';
import {Question} from './questions.model';
import {SQLite} from '@ionic-native/sqlite/ngx';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
    shValue: '';
    questions: Question[];
    toBeChecked: Question;

    constructor(
        private questionService: QuestionService,
        private sqlite: SQLite,
        private alertCtrl: AlertController
    ) {

    }

    ngOnInit() {
        this.dbOpen();
        this.questions = this.questionService.getAllQuestions();
    }

    saveQuestion() {
        const qarray: string[] = ['q', 'a', 'b', 'c', 'd', 'type'];
        this.questionService.saveQuestion(qarray);
    }

    checkQuestion(que, answer) {
        this.toBeChecked = this.questionService.checkQuestion(que, answer);

        if (this.toBeChecked.answerA === answer) {
            this.alertCtrl.create({
               header: 'Hey!',
               message: 'It worked!',
               buttons: [{text: 'Yay!', role: 'cancel'}]
            }).then(alertEl => {
                alertEl.present();
            });
        } else {
            this.alertCtrl.create({
                header: 'Nope.',
                message: 'Meh.',
                buttons: [{text: 'Next time.', role: 'cancel'}]
            }).then(alertEl => {
                alertEl.present();
            });
        }
    }

    // ngOnDestroy() {
    //     this.dbClose();
    // }

    dbOpen() {

    }

    dbClose() {

    }

    saveSheetValue(value) {
        console.log('Sheet Value is: ' + value);
        this.questionService.updateSheetValue(value);
    }

}
