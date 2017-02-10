import {Injectable} from '@angular/core';
import {Month} from './month.model';

@Injectable()
export class MonthService {
  weekdayLabels: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  monthNames: string[] = ['January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'];
  monthLength: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  year: number = new Date().getFullYear();

  constructor() {

  }

  generateDays(monthNumber) {
    let result = [],
      monthLength = this.monthLength[monthNumber],
      startingDay = new Date(this.year, monthNumber, 1).getDay();
    startingDay = startingDay > 0 ? startingDay : 7

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
      result.push(i);
    }

    return result;
  }

  setYear(year) {
    this.year = year;
  }

  generateYears() {
    let years = [];
    for (let i = this.year - 1; i < this.year + 5; i++) {
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
    })

    return result;
  }
}
