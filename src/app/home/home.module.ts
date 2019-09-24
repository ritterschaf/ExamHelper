import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import {QuestionsComponent} from '../questions/questions.component';
import {PianoComponent} from '../piano/piano.component';
import {KatexModule} from 'ng-katex';
import {MathComponent} from '../questions/math/math.component';
import {SheetComponent} from '../questions/sheet/sheet.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomePage
            }
        ]),
        KatexModule
    ],
    declarations: [HomePage, QuestionsComponent, PianoComponent, MathComponent, SheetComponent]
})
export class HomePageModule {}
