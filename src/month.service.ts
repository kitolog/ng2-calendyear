import {Injectable} from '@angular/core';
import {Month} from './month.model';
import moment from 'moment';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class MonthService {
  weekdayLabels: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  monthNames: string[] = ['January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'];
  monthLength: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  year: number = new Date().getFullYear();
  originalYear: number = new Date().getFullYear();
  public year$: Observable<any> = null;
  private _yearSource = new Subject<any>();

  constructor() {
    this.year$ = this._yearSource.asObservable();
    this._yearSource.next(this.year);
  }

  generateDays(monthNumber: any) {
    let result = [],
      monthLength = this.monthLength[monthNumber],
      startingDay = new Date(this.year, monthNumber, 1).getDay();
    startingDay = startingDay > 0 ? startingDay : 7;

    if (startingDay > 1) {
      for (let j = 1; j < startingDay; j++) {
        result.push('');
      }
    }

    if (monthNumber == 1) { // February only!
      if ((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0) {
        monthLength = 29;
      }
    }

    for (let i = 1; i <= monthLength; i++) {
      result.push({
        date: i,
        momentDate: this.getMomentDate(this.year, this.monthNames[monthNumber], i),
        isSelected: false
      });
    }

    return result;
  }

  getMomentDate(year: any, month: any, date: any) {
    return moment().set({year, month, date});
  }

  setYear(year: any) {
    this.year = year;
    this._yearSource.next(this.year);
  }

  generateYears() {
    let years = [];
    for (let i = this.originalYear - 1; i < this.originalYear + 5; i++) {
      years.push(i);
    }

    return years;
  }

  getMonths() {
    let result = [];
    this.monthNames.map((monthName, index) => {
      result.push(
        new Month({
          name: monthName,
          days: this.generateDays(index),
          weekdays: this.weekdayLabels,
        })
      );
    });

    return result;
  }
}
