import {Injectable} from '@angular/core';
import {Question} from './questions.model';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';
import {Observable, Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class QuestionService {
    private sheetValue = new Subject<string>();
    // private questionObs = new Subject<Question>();
    private questions: Question[] = [
        {
            question: 'Was ist die Bedeutung von bird?',
            answerA: 'Vogel',
            answerB: 'Wurm',
            answerC: 'Apfel',
            answerD: 'Teller',
            type: 'text'
        },
        {
            question: 'B',
            answerA: 'B',
            answerB: 'D#',
            answerC: 'E',
            answerD: 'F#',
            type: 'sheet'
        },
        {
            question: '\\sqrt{16}',
            answerA: '4',
            answerB: '2',
            answerC: '42',
            answerD: '6',
            type: 'math'
        }
    ];

    constructor(private sqlite: SQLite) {
    }

    getAllQuestions() {
        return [...this.questions];
        // returns a COPY of this questions-array
    }

    saveQuestion(data) {
        // give data to db

        this.questions.push({
            question: data[0],
            answerA: data[1],
            answerB: data[2],
            answerC: data[3],
            answerD: data[4],
            type: data[5]
        });
        return this.getAllQuestions();
    }

    checkQuestion(que: string, answer: string) {
        return {
            ...this.questions.find(question => {
                return question.question === que;
            })
        };
    }


    // updateQuestions(): Observable<Question> {
    //     return this.questionObs.asObservable();
    // }

    getSheetValue(): Observable<string> {
        return this.sheetValue.asObservable();
        // this way we have exposed "sheetValue" as an observable
    }

    updateSheetValue(value: string) {
        this.sheetValue.next(value);
        //
    }
}


