import {Component, OnInit, OnDestroy} from '@angular/core';
import {QuestionService} from '../questions/question.service';
import * as vexflow from 'vexflow';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-piano',
    templateUrl: './piano.component.html',
    styleUrls: ['./piano.component.scss'],
})


export class PianoComponent implements OnInit, OnDestroy {
    // @ViewChild('sheetValue', {static: false}) sheetValueRef: ElementRef;
    shValue = '';
    shSub: Subscription;

    constructor(private questionService: QuestionService) {
        this.shSub = this.questionService.getSheetValue()
            .subscribe(sheetValue => this.shValue = sheetValue);
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
        this.shSub.unsubscribe();
        // memory leak guard step.
    }

    generateSheet() {
        const VF = vexflow.Flow;

        // Create an SVG renderer and attach it to the DIV element named "boo".
        const div = document.getElementById('boo');
        const texta = document.getElementById('sheetValue');
        console.log(div);
        const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

        // Configure the rendering context.
        renderer.resize(120, 150);
        const context = renderer.getContext();
        context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed');

        // Create a stave of width 400 at position 10, 40 on the canvas.
        const stave = new VF.Stave(10, 10, 100);

        // Add a clef and time signature.
        // stave.addClef('treble').addTimeSignature('4/4');
        stave.addClef('treble');

        // const noteValue = this.sheetValueRef.nativeElement.innerText;
        // console.log(noteValue);
        // Connect it to the rendering context and draw!
        stave.setContext(context).draw();

        let notes = [
            new VF.StaveNote({keys: [this.shValue], duration: 'q'})
        ];

        // Create a voice in 4/4 and add above notes
        const voice = new VF.Voice({num_beats: 1, beat_value: 4});
        voice.addTickables(notes);

        // Format and justify the notes to 400 pixels.
        const formatter = new VF.Formatter().joinVoices([voice]).format([voice], 50);

        // Render voice
        voice.draw(context, stave);

    }

}
