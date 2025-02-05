import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loadingSubject = new BehaviorSubject<{ [key: string]: boolean }>({});
  public loading$ = this.loadingSubject.asObservable();
  startLoading(apiId: string) {
    const loading = this.loadingSubject.value;
    this.loadingSubject.next({
      ...loading,
      [apiId]: true
    });
  }
  stopLoading(apiId: string) {
    const loadArr = this.loadingSubject.value;
    delete loadArr[apiId];
    this.loadingSubject.next(loadArr);
  }
}
