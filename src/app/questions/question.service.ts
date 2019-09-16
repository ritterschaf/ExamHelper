import {Injectable} from '@angular/core';
import {Question} from './questions.model';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';

@Injectable({
    providedIn: 'root'
})
export class QuestionService {

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
            question: 'C#',
            answerA: 'C#',
            answerB: 'D#',
            answerC: 'E',
            answerD: 'F#',
            type: 'sheet'
        },
        {
            question: 'Wurzel aus 16',
            answerA: '4',
            answerB: '2',
            answerC: '42',
            answerD: '6',
            type: 'math'
        }
    ];


    constructor(private sqlite: SQLite) {
    }

    // dbOpen() {
    //
    //     // document.addEventListener('deviceready', function() {
    //     //     db = window.sqlitePlugin.openDatabase({
    //     //         name: 'my.db',
    //     //         location: 'default',
    //     //     });
    //     // });
    //     // // this.db = this.sqlite.create({
    //     // //     name: 'data.db',
    //     // //     location: 'default'
    //     // //
    //     // //     // CREATE TABLE IF NOT EXISTS questionpool(question text, answera text, answerb text, answerc text, answerd text, type text
    //     // //
    //     // // }).then((db: SQLiteObject) => {
    //     // //     db.executeSql(
    //     // //         'CREATE TABLE IF NOT EXISTS questionpool(question text, answera text, answerb text, answerc text, answerd text, type text)',
    //     // //         [])
    //     // //         .then(() => console.log('Executed SQL'))
    //     // //         .catch(e => console.log(e));
    //     // // })
    //     // //     .catch(e => console.log(e));
    // }
    //
    // dbClose() {
    //     this.db.close();
    // }

    getAllQuestions() {
        return [...this.questions];
        // returns a COPY of this questions-array
    }

    saveQuestion(data) {
        // give data to db
    }

}


