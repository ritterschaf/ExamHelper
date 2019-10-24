import {Component, Input, OnInit} from '@angular/core';
import * as vexflow from 'vexflow';

@Component({
    selector: 'app-sheet',
    // templateUrl: './sheet.component.html',
    template: '<div id="boo"></div>',
    styleUrls: ['./sheet.component.scss'],
})
export class SheetComponent implements OnInit {
    number = null;
    @Input() shValue = '';
    shValue2 = 'd#';
    @Input() id: number;

    // private name = 'boo' + this.id.toString();
    constructor() {
    }

    ngOnInit() {

        if (this.shValue === 'b' || this.shValue === 'B') {
            this.shValue = 'bb';
        }
        if (this.shValue === 'h' || this.shValue === 'H') {
            this.shValue = 'x';
            // deutsches "h" ist auf englisch "b".
        }

        // this "converts" the note-value into one vex can read, with varying octaves
        this.number = Math.floor(Math.random() * 3) + 3;
        this.shValue = `${this.shValue}/${this.number}`;


        const VF = vexflow.Flow;

        // Create an SVG renderer and attach it to the DIV element named "boo".
        // const div = document.getElementById(name);
        const div = document.getElementById('boo');
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

        let notes = [];

        if (this.shValue.includes('#') && this.shValue !== 'b' || this.shValue.includes('b') && this.shValue !== 'b') {
            notes = [
                new VF.StaveNote({
                    keys: [this.shValue],
                    duration: 'q'
                }).addAccidental(0, new VF.Accidental(this.shValue.slice(1, -2)))
            ];

        } else {
            notes = [
                new VF.StaveNote({keys: [this.shValue], duration: 'q'})
            ];
        }
        // Create a voice in 4/4 and add above notes
        const voice = new VF.Voice({num_beats: 1, beat_value: 4});
        voice.addTickables(notes);

        // Format and justify the notes to 400 pixels.
        const formatter = new VF.Formatter().joinVoices([voice]).format([voice], 50);

        // Render voice
        voice.draw(context, stave);
    }

}
