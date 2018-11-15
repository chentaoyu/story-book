
import { Component, EventEmitter, Output } from '@angular/core';

import { CheckbokComponent } from './checkbok.component';
@Component({
    selector: 'ct-checkbox-wrapper',
    preserveWhitespaces: false,
    templateUrl: './checkbox-wrapper.component.html'
})
export class CheckboxWrapperComponent {
    @Output() ctOnChange = new EventEmitter<string[]>();
    private checkboxList: CheckbokComponent[] = [];

    addCheckbox(value: CheckbokComponent): void {
        this.checkboxList.push(value);
    }

    removeCheckbox(value: CheckbokComponent): void {
        this.checkboxList.splice(this.checkboxList.indexOf(value), 1);
    }

    outputValue(): string[] {
        const checkedList = this.checkboxList.filter(item => item.ctChecked);
        return checkedList.map(item => item.ctValue);
    }

    onChange(): void {
        this.ctOnChange.emit(this.outputValue());
    }
}
