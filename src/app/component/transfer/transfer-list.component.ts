import { Component, OnInit, ElementRef, Input, TemplateRef, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { TcUpdateHostClassService } from '../core/service';
import { TransferItem } from './interface';
import { isEmpty, toBoolean } from '../core/util';
@Component({
  selector: 'app-transfer-list',
  templateUrl: './transfer-list.component.html',
  providers: [TcUpdateHostClassService]
})
export class TransferListComponent implements OnInit {
  @Output() handleSelect: EventEmitter<any> = new EventEmitter();
  @Output() allHandleSelect: EventEmitter<any> = new EventEmitter();
  @Input() dataSource: TransferItem[];
  @Input() render: TemplateRef<void>;
  @Input() footer: TemplateRef<void>;
  @Input() titleText: string;
  _showSearch = true;
  @Input()
  set showSearch(value: boolean) {
    this._showSearch = toBoolean(value);
  }

  get showSearch(): boolean {
    return this._showSearch;
  }
  stat = {
    checkAll: false,
    checkHalf: false,
    checkCount: 0,
    shownCount: 0
  };
  constructor(private el: ElementRef, private updateHostClassService: TcUpdateHostClassService) { }
  prefixCls = 'transfer-list';

  setClassMap(): void {
    const classMap = {
      [this.prefixCls]: true,
      [`${this.prefixCls}-with-footer`]: !!this.footer
    };
    this.updateHostClassService.updateHostClass(this.el.nativeElement, classMap);
  }

  ngOnInit() {
    console.log(this.dataSource);
    this.setClassMap();
  }

  private updateCheckStatus(): void {
    const validCount = this.dataSource.filter(w => !w.disabled).length;
    this.stat.checkCount = this.dataSource.filter(w => w.checked && !w.disabled).length;
    this.stat.shownCount = this.dataSource.filter(w => !w._hiden).length;
    this.stat.checkAll = validCount > 0 && validCount === this.stat.checkCount;
    this.stat.checkHalf = this.stat.checkCount > 0 && !this.stat.checkAll;
  }

  _selectAll(status: boolean) {
    console.log('list', this);
    this.dataSource.forEach(item => {
      if (!item.disabled && !item._hiden) {
        item.checked = status;
      }
    });
    this.updateCheckStatus();
    this.allHandleSelect.emit(status);
  }

  _handerSelect(item) {
    this.handleSelect.emit(item);
  }

}
