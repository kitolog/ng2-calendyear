import moment from 'moment';

export class Appointment {
  id: string;
  name: string;
  startDate: any;
  endDate: any;
  isNoted: boolean = false;

  constructor(item: any) {
    this.name = item.name;
    this.startDate = moment(item.startDate);
    this.endDate = moment(item.endDate);
    this.isNoted = item.isNoted || false;

    if (item.hasOwnProperty('id') && item.id) {
      this.id = item.id;
    } else {
      this.id = Appointment.generateId();
    }
  }

  update(data: any) {
    if (data.name) {
      this.name = data.name;
    }
    if (data.startDate) {
      this.startDate = moment(data.startDate);
    }
    if (data.endDate) {
      this.endDate = moment(data.endDate);
    }
    if (data.hasOwnProperty('isNoted')) {
      this.isNoted = data.isNoted;
    }
  }

  private static generateId() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
}
