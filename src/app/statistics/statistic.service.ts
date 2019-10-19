import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StatisticService {
    private subject = new Subject<any>();
    // krieg hier Informationen vom questions-component und gib die per Observable an
    // die statistics page weiter.

    constructor() {
    }


    generateStatistic(right, wrong) {
        const a = [right, wrong];
        this.subject.next({a});
    }

    getValues(): Observable<any> {
        return this.subject.asObservable();
    }

    clearValues() {
        this.subject.next();
    }

}
