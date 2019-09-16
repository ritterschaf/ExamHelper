import {Component, OnInit, OnDestroy} from '@angular/core';
import {QuestionService} from './question.service';
import {Question} from './questions.model';
import {SQLite} from '@ionic-native/sqlite/ngx';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
    questions: Question[];

    constructor(
        private questionService: QuestionService,
        private sqlite: SQLite) {
    }

    ngOnInit() {
        this.dbOpen();
        this.questions = this.questionService.getAllQuestions();
    }

    saveQuestion() {
        const qarray: string[] = ['q', 'a', 'b', 'c', 'd', 'type'];
        this.questionService.saveQuestion(qarray);
    }

    ngOnDestroy() {
        this.dbClose();
    }

    dbOpen() {

    }

    dbClose() {

    }

}
