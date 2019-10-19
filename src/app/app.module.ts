import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';

import {KatexModule} from 'ng-katex';

import {SQLite, SQLiteDatabaseConfig, SQLiteObject} from '@ionic-native/sqlite/ngx';
import {SQLitePorter} from '@ionic-native/sqlite-porter/ngx';
// import {SQLiteMock} from '@ionic-native-mocks/sqlite';

import {HttpClientModule} from '@angular/common/http';
import {File} from '@ionic-native/file/ngx';


// This class is used, to mock SQLite for the browser. SQLite - as an @ionic-native plugin - isn't available
// in the browser, due to stemming from cordova. cordova is for mobile devices only.
// so we need to mock this in order to be able to use it in the browser for development purposes.
// class SQLiteMock {
//     public create(config: SQLiteDatabaseConfig): Promise<SQLiteObject> {
//
//         return new Promise((resolve, reject) => {
//             resolve(new SQLiteObject(new Object()));
//         });
//     }
// }

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(),
        AppRoutingModule, HttpClientModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})],

    providers: [
        StatusBar,
        SplashScreen,
        // {provide: SQLite, useClass: SQLiteMock},
        SQLite,
        SQLitePorter,
        KatexModule,
        File,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
