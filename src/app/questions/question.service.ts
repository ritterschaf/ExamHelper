import {Injectable} from '@angular/core';
import {Question} from './questions.model';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';
import {SQLitePorter} from '@ionic-native/sqlite-porter/ngx';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Platform} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class QuestionService {
    private highestId = 3;
    private database: SQLiteObject;
    private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private questionSubject = new BehaviorSubject([]);
    // private sheetValue = new Subject<string>();
    // private questionObs = new Subject<Question>();
    private questions: Question[] = [
        {
            id: 1,
            question: 'Was ist die Bedeutung von bird?',
            answerA: 'Vogel',
            answerB: 'Wurm',
            answerC: 'Apfel',
            answerD: 'Teller',
            answertype: 'text',
            rights: 2
        },
        {
            id: 2,
            question: 'B',
            answerA: 'B',
            answerB: 'D#',
            answerC: 'G',
            answerD: 'F#',
            answertype: 'sheet',
            rights: 4
        },
        {
            id: 3,
            question: '\\sqrt{16}',
            answerA: '4',
            answerB: '2',
            answerC: '42',
            answerD: '6',
            answertype: 'math',
            rights: 0
        }
    ];


    constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {

        // this.plt.ready().then(() => {
        //     this.sqlite.create({
        //         name: 'questions.db',
        //         location: 'default'
        //     }).catch(e => console.error('This is db error on create: ', e))
        //         .then((db: SQLiteObject) => {
        //             this.database = db;
        //             this.seedDatabase();
        //         }).catch(e => console.error('This is db error: ', e));
        // });
    }

    seedDatabase() {
        this.http.get('assets/startup.sql', {responseType: 'text'})
            .subscribe(sql => {
                this.sqlitePorter.importSqlToDb(this.database, sql)
                    .then(_ => {
                        this.loadQuestions();
                        this.dbReady.next(true);
                    })
                    .catch(e => console.error('This is db error: ', e));

            });
    }


    loadQuestions() {
        return this.database.executeSql('SELECT * FROM questionlist', []).then(data => {
            const ques: Question[] = [];

            if (data.rows.length > 0) {
                for (let i = 0; i < data.rows.length; i++) {
                    ques.push({
                        id: data.rows.item(i).id,
                        question: data.rows.item(i).question,
                        answerA: data.rows.item(i).answerA,
                        answerB: data.rows.item(i).answerB,
                        answerC: data.rows.item(i).answerC,
                        answerD: data.rows.item(i).answerD,
                        answertype: data.rows.item(i).answertype,
                        rights: data.rows.item(i).rights
                    });
                }
            }
            // subscribers to questionSubject get new array ques
            this.questionSubject.next(ques);
        });
    }

    saveQuestion(data) {
        // give data to db
        //
        this.questions.push({
            id: this.highestId + 1,
            question: data[0],
            answerA: data[1],
            answerB: data[2],
            answerC: data[3],
            answerD: data[4],
            answertype: data[5],
            rights: 0
        });
        this.highestId++;
        console.log(this.questions);
        return this.getAllQuestions();

        // return this.database.executeSql('INSERT INTO questionlist(question, answera, answerb, answerc, answerd, answertype) VALUES(?, ?, ?, ?, ?, ?) ', data)
        //     .then(data => {
        //         this.loadQuestions();
        //     });

    }

    checkQuestion(que: string, answer: string) {
        return {
            ...this.questions.find(question => {
                return question.question === que;
            })
        };
    }


    // -- ** -- ** Observable Funktionen -- ** -- **

    // get current value of database.
    getDatabaseState() {
        return this.dbReady.asObservable();
    }

    getAllQuestions() {
        return [...this.questions];
        // returns a COPY of this questions-array
    }

    getQuestions(): Observable<Question[]> {
        return this.questionSubject.asObservable();
    }

    deleteQuestions(questiontext) {
        this.questions = this.questions.filter(question => {
            return question.question !== questiontext;
        });
    }

    // dbOpen() {
    //
    //     // document.addEventListener('deviceready', function() {
    //     //     db = window.sqlitePlugin.openDatabase({
    //     //         name: 'my.db',
    //     //         location: 'default',
    //     //     });
    //     // });
    //     this.db = this.sqlite.create({
    //         name: 'data.db',
    //         location: 'default'
    //
    //         // CREATE TABLE IF NOT EXISTS questionpool(question text, answera text, answerb text, answerc text, answerd text, type text
    //
    //     }).then((db: SQLiteObject) => {
    //         db.executeSql(
    //             'CREATE TABLE IF NOT EXISTS questionpool(question text, answera text, answerb text, answerc text, answerd text, type text)',
    //             [])
    //             .then(() => console.log('Executed SQL'))
    //             .catch(e => console.log(e));
    //     })
    //         .catch(e => console.log(e));
    // }

    //
    // dbClose() {
    //     this.db.close();
    // }


    // updateQuestions(): Observable<Question> {
    //     return this.questionObs.asObservable();
    // }

    // getSheetValue(): Observable<string> {
    //     return this.sheetValue.asObservable();
    //     // this way we have exposed "sheetValue" as an observable
    // }

    // updateSheetValue(value: string) {
    //     this.sheetValue.next(value);
    //     //
    // }
}


