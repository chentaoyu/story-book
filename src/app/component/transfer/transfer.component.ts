import { Component, OnInit, EventEmitter, ElementRef, Input, OnChanges, Output } from '@angular/core';
import { TcUpdateHostClassService } from '../core/service';
import { TransferItem } from './interface';
@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  providers: [TcUpdateHostClassService]
})
export class TransferComponent implements OnInit, OnChanges {
  @Input() searchPlaceholder: string;
  @Input() dataSource = [];
  @Input() titleText: string;
  @Output() selectChange = new EventEmitter();
  @Output() searchChange = new EventEmitter();
  @Input() filterOption: (inputValue: string, item: TransferItem) => boolean;
  leftStatus = false;
  rightStatus = false;
  prefixCls = 'transfor-arrow-left';
  // left
  leftDataSource: TransferItem[] = [];

  // right
  rightDataSource: TransferItem[] = [];
  constructor(private el: ElementRef, private updateHostClassService: TcUpdateHostClassService) { }

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

  status(direction: string, value: boolean): void {
    if (direction === 'left') {
      this.leftStatus = value;
    } else {
      this.rightStatus = value;
    }
  }

  ngOnInit() {
  }

  private getCheckedData(direction: string): TransferItem[] {
    return this[direction === 'left' ? 'leftDataSource' : 'rightDataSource'].filter(w => w.checked);
  }

  private updateOperationStatus(direction: string, count?: number): void {
    this[direction === 'right' ? 'leftActive' : 'rightActive'] = (typeof count === 'undefined' ?
      this.getCheckedData(direction).filter(w => !w.disabled).length : count) > 0;
  }


  handleLeftSelect = (item: TransferItem) => this.handleSelect('left', item.checked, item);

  handleSelect(direction: 'left' | 'right', checked: boolean, item?: TransferItem) {
    const list = this.getCheckedData(direction);
    this.updateOperationStatus(direction, list.length);
    this.selectChange.emit({ direction, checked, list, item });
  }

  handleFilterChange(ret: { direction: string, value: string }): void {
    this.searchChange.emit(ret);
  }

  ngOnChanges() {
    this.splitDataSource();
  }
}
