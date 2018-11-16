import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
    selector: 'ct-transfer-search,[ct-transfer-search]',
    preserveWhitespaces: false,
    templateUrl: './transfer-search.component.html'
})
export class TransferSearchComponent {

    // region: fields

    @Input() placeholder: string;
    @Input() value: string;

    @Output() valueChanged = new EventEmitter<string>();
    @Output() valueClear = new EventEmitter();

    // endregion

    _handle(): void {
        this.valueChanged.emit(this.value);
    }

    _clear(): void {
        this.value = '';
        this.valueClear.emit();
    }
}
