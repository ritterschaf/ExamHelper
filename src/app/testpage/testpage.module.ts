import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TestpagePage } from './testpage.page';
import {HomePageModule} from '../home/home.module';
import {StatisticsComponent} from '../statistics/statistics.component';

const routes: Routes = [
  {
    path: '',
    component: TestpagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TestpagePage]
})
export class TestpagePageModule {}
