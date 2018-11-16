import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'demo';
  dataSource = [];
  titleText = 'select all';
  searchPlaceholder = 'input';
  selectChange(value) {
    console.log(2, value);
  }
  ngOnInit(): void {
    for (let i = 0; i < 20; i++) {
      this.dataSource.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        direction: Math.random() * 2 > 1 ? 'right' : ''
      });
    }
  }

  filterOption(inputValue: string, item: any): boolean {
    return item.description.indexOf(inputValue) > -1;
  }

  searchChange(value) {
    console.log(value);
  }
}
