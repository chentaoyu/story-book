import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TransferComponent } from './transfer.component';
import { TransferListComponent } from './transfer-list.component';
import { CheckboxModule } from '../checkbok/checkbox.module';
import { FormsModule } from '@angular/forms';
import { TransferSearchComponent } from './transfer-search.component';
@NgModule({
    imports: [CommonModule, CheckboxModule, FormsModule],
    declarations: [TransferComponent, TransferListComponent, TransferSearchComponent],
    exports: [TransferComponent]
})
export class TransferModule { }
