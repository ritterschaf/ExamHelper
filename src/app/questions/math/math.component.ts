import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../questions.model';

@Component({
  selector: 'app-math',
  template: `<ng-katex [equation]='mathQuestion'></ng-katex>`,
  styleUrls: ['./math.component.scss'],
})
export class MathComponent implements OnInit {
  // @Input() mathQuestion: Question;
  @Input() mathQuestion: string;
  equ: string = '\\sqrt{16}';

  constructor() { }

  ngOnInit() {}

}
