import {Injectable} from '@angular/core';
import {Question} from './questions.model';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';
import {SQLitePorter} from '@ionic-native/sqlite-porter/ngx';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Platform} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import questiondata from '../../assets/lorem.json';
import {File} from '@ionic-native/file/ngx';

@Injectable({
    providedIn: 'root'
})
export class QuestionService {
    whatever: any;
    private highestId = 1;
    private database: SQLiteObject;
    private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private questionSubject = new BehaviorSubject([]);

    private questionarray: any[] = questiondata;
    private questionsS: Question[] = [];

    // private sheetValue = new Subject<string>();
    // private questionObs = new Subject<Question>();
    // private questions: Question[] = [
    //     {
    //         id: 1,
    //         question: 'Was ist die Bedeutung von bird?',
    //         answerA: 'Vogel',
    //         answerB: 'Wurm',
    //         answerC: 'Apfel',
    //         answerD: 'Teller',
    //         answertype: 'text',
    //         rights: 2
    //     },
    //     {
    //         id: 2,
    //         question: 'B',
    //         answerA: 'B',
    //         answerB: 'D#',
    //         answerC: 'G',
    //         answerD: 'F#',
    //         answertype: 'sheet',
    //         rights: 4
    //     },
    //     {
    //         id: 3,
    //         question: '\\sqrt{16}',
    //         answerA: '4',
    //         answerB: '2',
    //         answerC: '42',
    //         answerD: '6',
    //         answertype: 'math',
    //         rights: 0
    //     },
    //     {
    //         id: 4,
    //         question: 'x^2+x^2',
    //         answerA: '2x^2',
    //         answerB: 'x^4',
    //         answerC: 'x^8',
    //         answerD: '4x',
    //         answertype: 'math',
    //         rights: 5
    //     },
    //     {
    //         id: 5,
    //         question: 'Was bedeutet Sleep?',
    //         answerA: 'Schlaf',
    //         answerB: 'Schaf',
    //         answerC: 'Wolke',
    //         answerD: 'Wolle',
    //         answertype: 'text',
    //         rights: 7
    //     }
    // ];


    constructor(
        private plt: Platform,
        private sqlitePorter: SQLitePorter,
        private sqlite: SQLite,
        private http: HttpClient, public file: File) {

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

        // this.file.createFile(this.file.dataDirectory, 'questions.json', true);
        // console.log('questionarray: ', this.questionarray);
        // this.file.writeFile(this.file.dataDirectory, 'questions.json', JSON.stringify(this.questionarray), {replace: true});
        // fetch('../../assets/questionpool.json').then(res => res.json())
        //     .then(json => {
        //         this.questions = json;
        //
        //     });
        //
        // console.log('Constructor work finished.');
    }

    jsonload() {


        if (this.file.checkFile(this.file.dataDirectory, 'questions.json')) {
            // fetch(this.file.dataDirectory + 'questions.json').then(res => res.json())
            //     .then(json => {
            //         this.questionsS = json;
            //         console.log('New Array:', this.questionsS);
            //         this.questionSubject.next(this.questionsS);
            //     });
            this.file.readAsText(this.file.dataDirectory, 'questions.json').then(data => {
                this.questionsS = JSON.parse(data);
                console.log('read out data: ', this.questionsS);
                this.questionSubject.next(this.questionsS);
            });
        } else {
            this.file.createFile(this.file.dataDirectory, 'questions.json', false);
        }
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
        this.questionsS.push({
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
        // console.log('saved: ', this.questionsS);

        // this.writeJSON('lorem.json', {a: 'foo', b: 'bar'});
        this.questionSubject.next(this.questionsS);
        // return this.getAllQuestions();
        // this.file.createFile('../../assets/', 'newFile.json', true).then(_ => console.log('Creation worked')).catch(err =>
        //     console.log('Creation didnt work'));
        this.file.writeExistingFile(this.file.dataDirectory, 'questions.json', JSON.stringify(this.questionsS)).then(() => {
            console.log('Written to file.');
        });

        // return this.database.executeSql(
        // 'INSERT INTO questionlist(question, answera, answerb, answerc, answerd, answertype) VALUES(?, ?, ?, ?, ?, ?) ', data)
        //     .then(data => {
        //         this.loadQuestions();
        //     });

    }


    checkQuestion(que: string, answer: string) {
        return {
            ...this.questionsS.find(question => {
                return question.question === que;
            })
        };
    }

    updateRights(que: string) {
        // this.questionsS.find(question => {
        //    if (question.id === id && question.question === que) {
        //        question.rights = question.rights + 1;
        //    }
        // });

        // TAKE ID INTO IF TOO! ...But for that provide id in questions.component.
        for (const ques of this.questionsS) {
            if (ques.question === que) {
                ques.rights = ques.rights + 1;
                console.log('new rights: ', ques.rights);
                this.questionSubject.next(this.questionsS);
                this.file.writeExistingFile(this.file.dataDirectory, 'questions.json', JSON.stringify(this.questionsS)).then(() => {
                    console.log('Updated rights written to file.');
                });
            }
        }
    }

    // -- ** -- ** Observable Funktionen -- ** -- **

    // get current value of database.
    getDatabaseState() {
        return this.dbReady.asObservable();
    }

    getAllQuestions() {
        return [...this.questionsS];
        // returns a COPY of this questions-array
    }

    // updateQuestions(): Observable<Question> {
    //     return this.questionObs.asObservable();
    // }

    getQuestions(): Observable<Question[]> {
        return this.questionSubject.asObservable();
    }

    deleteQuestion(questiontext) {
        this.questionsS = this.questionsS.filter(question => {
            return question.question !== questiontext;
        });
        this.questionSubject.next(this.questionsS);
        console.log('New array:', this.questionsS);
        this.file.writeExistingFile(this.file.dataDirectory, 'questions.json', JSON.stringify(this.questionsS));
    }


    writeJSON(filename, object) {
        return this.file.writeFile(this.file.dataDirectory, filename, JSON.stringify(object), {replace: true})
            .then(() => console.log('Executed Filework'))
            ;
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
    //             'CREATE TABLE IF NOT EXISTS questionpool
    //             (question text, answera text, answerb text, answerc text, answerd text, type text)',
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


    // getSheetValue(): Observable<string> {
    //     return this.sheetValue.asObservable();
    //     // this way we have exposed "sheetValue" as an observable
    // }

    // updateSheetValue(value: string) {
    //     this.sheetValue.next(value);
    //     //
    // }
}


