export class Month {
  id: string;
  name: string;
  days: number[];
  weekdays: number[];

  constructor(item: any) {
    this.id = this.generateId();
    this.name = item.name;
    this.days = item.days;
    this.weekdays = item.weekdays;
  }

  generateId() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
}
