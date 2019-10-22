import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {StatisticsComponent} from './statistics/statistics.component';

const routes: Routes = [
    {path: '', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)}


];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
