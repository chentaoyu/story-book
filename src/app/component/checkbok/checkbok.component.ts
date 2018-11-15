import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  forwardRef,
  Input,
  ViewChild,
  ElementRef,
  Renderer2,
  AfterViewInit,
  OnChanges,
  DoCheck,
  HostListener,
  Optional,
  OnDestroy,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isEmpty, toBoolean } from '../core/util';
import { CheckboxWrapperComponent } from './checkbox-wrapper.component';

@Component({
  selector: 'ct-checkbox,[ct-checkbox]',
  templateUrl: './checkbok.component.html',
  styleUrls: ['./checkbok.component.scss'],
  // encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckbokComponent),
      multi: true
    }
  ]
})
export class CheckbokComponent implements OnInit, AfterViewInit, ControlValueAccessor, OnChanges, OnDestroy {

  private onTouched = Function.prototype;
  private onChange = Function.prototype;
  private isInit = false;
  private _checked = false;
  private _disabled = false;
  private _indeterminate = false;
  private _autoFocus = false;
  private prefixCls = 'checkbox';
  @Input() ctValue: string;
  @ViewChild('inputElement') private inputElement: ElementRef;
  @ViewChild('contentElement') contentElement: ElementRef;
  @Output() ctCheckedChange = new EventEmitter<boolean>();
  classMap = {};

  @HostListener('click', ['$event'])
  onClick(e: MouseEvent): void {
    e.preventDefault();
    this.inputElement.nativeElement.focus();
    if (!this.ctDisabled) {
      this.updateValue(!this.ctChecked);
    }
    console.log(this.ctChecked)
  }

  @Input() set ctChecked(value: boolean) {
    this._checked = value;
    this.updateClassMap();
  }

  get ctChecked(): boolean {
    return this._checked;
  }

  @Input() set ctAutoFocus(value: boolean) {
    this._autoFocus = toBoolean(value);
    this.updateAutoFocus();
  }

  get ctAutoFocus(): boolean {
    return this._autoFocus;
  }

  @Input() set ctDisabled(value: boolean) {
    this._disabled = toBoolean(value);
  }

  get ctDisabled(): boolean {
    return this._disabled;
  }

  @Input() set ctIndeterminate(value: boolean) {
    this._indeterminate = toBoolean(value);
  }

  get ctIndeterminate(): boolean {
    return this._indeterminate;
  }

  onBlur(): void {
    this.onTouched();
  }

  writeValue(value: boolean): void {
    this.ctChecked = value;
  }

  registerOnChange(fn: (_: boolean) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.ctDisabled = isDisabled;
  }

  updateAutoFocus(): void {
    if (this.isInit) {
      if (this.ctAutoFocus) {
        this.renderer.setAttribute(this.inputElement.nativeElement, 'autofocus', 'autofocus');
      } else {
        this.renderer.removeAttribute(this.inputElement.nativeElement, 'autofocus');
      }
    }
  }

  updateClassMap(): void {
    this.classMap = {
      [this.prefixCls]: true,
      [`${this.prefixCls}-checked`]: this.ctChecked && (!this.ctAutoFocus),
      [`${this.prefixCls}-disabled`]: this.ctDisabled,
      [`${this.prefixCls}-indeterminate`]: this.ctIndeterminate
    };
  }

  updateValue(value: boolean): void {
    this.onChange(value);
    this.ctCheckedChange.emit(value);
    this.ctChecked = value;
    if (this.checkboxWrapperComponent) {
      this.checkboxWrapperComponent.onChange();
    }
  }
  checkContent(): void {
    if (isEmpty(this.contentElement.nativeElement)) {
      this.renderer.setStyle(this.contentElement.nativeElement, 'display', 'none');
    } else {
      this.renderer.removeStyle(this.contentElement.nativeElement, 'display');
    }
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2,
    @Optional() private checkboxWrapperComponent: CheckboxWrapperComponent) { }

  ngOnInit() {
    this.updateClassMap();
  }

  ngOnChanges() {
    console.log('check change', this);
  }

  ngAfterViewInit(): void {
    this.isInit = true;
    this.updateAutoFocus();
    this.checkContent();
  }

  ngOnDestroy(): void {
    if (this.checkboxWrapperComponent) {
      this.checkboxWrapperComponent.removeCheckbox(this);
    }
  }
}
