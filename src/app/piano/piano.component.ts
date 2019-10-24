import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {QuestionService} from '../questions/question.service';
import {Question} from '../questions/questions.model';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-piano',
    templateUrl: './piano.component.html',
    styleUrls: ['./piano.component.scss'],
})


export class PianoComponent implements OnInit, OnDestroy {
    // @ViewChild('sheetValue', {static: false}) sheetValueRef: ElementRef;
    shValue = '';
    number = null;
    questionP: Question[];
    questionSub: Subscription;
    @Input() qValue = '';

    constructor(private questionService: QuestionService) {
        // this.shSub = this.questionService.getSheetValue()
        //     .subscribe(sheetValue => this.shValue = sheetValue);
        this.questionSub = this.questionService.getQuestions().subscribe(newData => {
            this.questionP = newData;
        });
    }

    ngOnInit() {

        // const VF = vexflow.Flow;
        //
        // // Create an SVG renderer and attach it to the DIV element named "boo".
        // const div = document.getElementById('boo');
        // const texta = document.getElementById('sheetValue');
        // console.log(div);
        // const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
        //
        // // Configure the rendering context.
        // renderer.resize(500, 500);
        // const context = renderer.getContext();
        // context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed');
        //
        // // Create a stave of width 400 at position 10, 40 on the canvas.
        // const stave = new VF.Stave(10, 40, 400);
        //
        // // Add a clef and time signature.
        // stave.addClef('treble').addTimeSignature('4/4');
        //
        // const noteValue = this.sheetValueRef.nativeElement.innerText;
        // console.log(noteValue);
        // // Connect it to the rendering context and draw!
        // stave.setContext(context).draw();


    }

    ngOnDestroy() {
        // this.shSub.unsubscribe();
        // memory leak guard step.
    }

    pianoClick(data) {
        const str = (data as Element).className;
        console.log('I was clicked! Target: ', (data as Element).className);
        // data as Element casts $event.target to Element, which then enables the
        // className property, because accessing the classname of an event.target isn't possible :)

        let newstr;
        // this.questionService.checkQuestions
        if (str.includes('black')) {
            newstr = str.slice(6, -1) + '#';
            console.log('sliced black string: ', newstr);
        } else {
            newstr = str.slice(-1);
            console.log('sliced white string: ', newstr);
        }

        console.log('this question is:', this.qValue);
        this.questionService.checkQuestion(this.qValue, newstr);
    }

    // checkQuestion(que, answer) {
    //     this.toBeChecked = this.questionService.checkQuestion(que, answer);
    //
    //     if (this.toBeChecked.answerA === answer) {
    //         this.rightAnswers = this.rightAnswers + 1;
    //         this.questionService.updateRights(que);
    //         console.log(this.rightAnswers);
    //         // this.alertCtrl.create({
    //         //     header: 'Your answer was...',
    //         //     message: '...correct! Yay!',
    //         //     buttons: [{text: 'Yay!', role: 'cancel'}]
    //         // }).then(alertEl => {
    //         //     alertEl.present();
    //         //
    //         // });
    //     } else {
    //         this.wrongAnswers = this.wrongAnswers + 1;
    //         console.log(this.wrongAnswers);
    //         // this.alertCtrl.create({
    //         //     header: 'Your answer was...',
    //         //     message: '...wrong. Sorry.',
    //         //     buttons: [{text: 'Next time.', role: 'cancel'}]
    //         // }).then(alertEl => {
    //         //     alertEl.present();
    //         // });
    //     }
    //     // let slider advance
    //     // and save values!
    //
    //     // this.examslider.lockSwipes(false);
    //     this.examslider.slideNext(500);
    //     // this.examslider.lockSwipes(true);
    // }


}
