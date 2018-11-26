import { Component, OnInit, EventEmitter, ElementRef, Input, OnChanges, Output } from '@angular/core';
import { TcUpdateHostClassService } from '../core/service';
import { TransferItem, TransferCanMove, TransferChange } from './interface';
import { of, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
  @Output() ctChange: EventEmitter<TransferChange> = new EventEmitter();
  leftActive = false;
  rightActive = false;
  prefixCls = 'transfor-arrow-left';
  leftDataSource: TransferItem[] = [];
  rightDataSource: TransferItem[] = [];

  @Input() canMove: (arg: TransferCanMove) => Observable<TransferItem[]> = (arg: TransferCanMove) => of(arg.list);


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
      this.leftActive = value;
    } else {
      this.rightActive = value;
    }
  }

  moveToLeft = () => this.moveTo('left');
  moveToRight = () => this.moveTo('right');

  moveTo(direction: string) {
    const oppsiteDirection = direction === 'left' ? 'right' : 'left';
    this.updateOperationStatus(oppsiteDirection, 0);
    const dataSource = direction === 'left' ? this.rightDataSource : this.leftDataSource;
    const moveList = dataSource.filter(element => element.checked && !element.disabled);
    this.canMove({ direction, list: moveList })
      .subscribe(
        newMoveList => this.truthMoveTo(direction, newMoveList.filter(i => !!i)),
        () => moveList.forEach(i => i.checked = false)
      );
  }

  private truthMoveTo(direction: string, list: TransferItem[]): void {
    const oppositeDirection = direction === 'left' ? 'right' : 'left';
    const datasource = direction === 'left' ? this.rightDataSource : this.leftDataSource;
    const targetDatasource = direction === 'left' ? this.leftDataSource : this.rightDataSource;
    for (const item of list) {
      item.checked = false;
      targetDatasource.push(item);
      datasource.splice(datasource.indexOf(item), 1);
    }
    this.updateOperationStatus(oppositeDirection);
    this.ctChange.emit({
      from: oppositeDirection,
      to: direction,
      list
    });
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


  constructor(private el: ElementRef, private updateHostClassService: TcUpdateHostClassService) { }
}
