import { Component, OnInit, ViewEncapsulation, Input, OnChanges } from '@angular/core';
import { TransferItem } from './interface';
@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html'
})
export class TransferComponent implements OnInit, OnChanges {

  @Input() dataSource = [];
  @Input() titleText: string;
  // left
  leftDataSource: TransferItem[] = [];

  // right
  rightDataSource: TransferItem[] = [];
  constructor() { }

  private splitDataSource(): void {
    this.leftDataSource = [];
    this.rightDataSource = [];
    this.dataSource.forEach(record => {
      if (record.direction === 'right') {
        this.rightDataSource.push(record);
      } else {
        this.leftDataSource.push(record);
      }
    });
  }

  ngOnInit() {
  }


  allHandleSelect = (checked: boolean) => this.handleSelect('left', checked);

  handleSelect(direction: 'left' | 'right', checked: boolean, item?: TransferItem) {
    // const list = this.getCheckedData(direction);
    // this.updateOperationStatus(direction, list.length);
    // this.nzSelectChange.emit({ direction, checked, list, item });
    console.log(1);
  }

  ngOnChanges() {
    this.splitDataSource();
  }
}
