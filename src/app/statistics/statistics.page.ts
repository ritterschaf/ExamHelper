import {Component, OnInit} from '@angular/core';
import {Question} from '../questions/questions.model';
import {QuestionService} from '../questions/question.service';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.page.html',
    styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {
    questions: Question[];
    private deletable: false;
    private right: number;
    private wrong: number;
    private amount: number;

    constructor(private questionservice: QuestionService) {
    }

    ngOnInit() {
    }

    generateStatistic(rights, wrongs) {
        this.questions = this.questionservice.getAllQuestions();
        // soll das Statistik in Richtung "Sie haben 5 von 6 Fragen richtig"
        // oder was in Richtung Diagramm...???

        rights = 4;
        wrongs = 2;
        this.right = rights;
        this.wrong = wrongs;
        this.amount = rights + wrongs;


    }

    showStastistic() {

        // show diagram or whatever

        // if there are questions with rights > 5
        // this.deletable = true.
        // show list of questions with rights > 5
        // and ask to delete them
        // if yes, call deleteQuestion from questionService
    }

}
