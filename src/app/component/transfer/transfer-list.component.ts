import {
  Component,
  OnInit,
  ElementRef,
  Input,
  TemplateRef,
  IterableDiffer,
  IterableDiffers,
  EventEmitter,
  Output,
  DoCheck
} from '@angular/core';
import { TcUpdateHostClassService } from '../core/service';
import { TransferItem } from './interface';
import { isEmpty, toBoolean } from '../core/util';
@Component({
  selector: 'app-transfer-list',
  templateUrl: './transfer-list.component.html',
  providers: [TcUpdateHostClassService]
})
export class TransferListComponent implements OnInit, DoCheck {
  @Output() handleSelect: EventEmitter<any> = new EventEmitter();
  @Output() allHandleSelect: EventEmitter<any> = new EventEmitter();
  @Input() searchPlaceholder: string;
  @Input() dataSource: TransferItem[];
  @Input() render: TemplateRef<void>;
  @Input() footer: TemplateRef<void>;
  @Input() titleText: string;
  @Input() filter = '';
  @Input() filterOption: (inputValue: string, item: TransferItem) => boolean;
  @Output() filterChange: EventEmitter<{ direction: string, value: string }> = new EventEmitter();
  @Input() direction = '';
  @Output() status = new EventEmitter();
  listDiffer: IterableDiffer<{}>;
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
  constructor(private el: ElementRef, private updateHostClassService: TcUpdateHostClassService, differs: IterableDiffers) {
    this.listDiffer = differs.find([]).create(null);
  }
  prefixCls = 'transfer-list';

  setClassMap(): void {
    const classMap = {
      [this.prefixCls]: true,
      [`${this.prefixCls}-with-footer`]: !!this.footer
    };
    this.updateHostClassService.updateHostClass(this.el.nativeElement, classMap);
  }

  ngOnInit() {
    this.setClassMap();
  }

  ngDoCheck() {
    const change = this.listDiffer.diff(this.dataSource);
    if (change) {
      this.updateCheckStatus();
    }
  }

  private updateCheckStatus(): void {
    const validCount = this.dataSource.filter(w => !w.disabled).length;
    this.stat.checkCount = this.dataSource.filter(w => w.checked && !w.disabled).length;
    this.stat.shownCount = this.dataSource.filter(w => !w._hiden).length;
    this.stat.checkAll = validCount > 0 && validCount === this.stat.checkCount;
    this.stat.checkHalf = this.stat.checkCount > 0 && !this.stat.checkAll;
    this.status.emit(this.stat.checkHalf || this.stat.checkAll);
  }

  _selectAll(status: boolean) {
    this.dataSource.forEach(item => {
      if (!item.disabled && !item._hiden) {
        item.checked = status;
      }
    });
    this.updateCheckStatus();
    this.allHandleSelect.emit(status);
  }

  _handerSelect(item) {
    if (item.disabled) {
      return;
    }
    item.checked = !item.checked;
    this.updateCheckStatus();
    this.handleSelect.emit(item);
  }

  handleFilter(value: string): void {
    this.filter = value;
    this.dataSource.forEach(item => {
      item._hiden = value.length > 0 && !this.matchFilter(value, item);
    });
    this.stat.shownCount = this.dataSource.filter(w => !w._hiden).length;
    this.filterChange.emit({ direction: this.direction, value });
  }

  handleClear(): void {
    this.handleFilter('');
  }

  private matchFilter(text: string, item: TransferItem): boolean {
    if (this.filterOption) {
      return this.filterOption(text, item);
    }
    return item.title.includes(text);
  }
}

