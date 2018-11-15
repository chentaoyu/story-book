import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CheckbokComponent } from './checkbok.component';
import { CheckboxWrapperComponent } from './checkbox-wrapper.component';

@NgModule({
    imports: [CommonModule],
    declarations: [CheckbokComponent, CheckboxWrapperComponent],
    exports: [CheckbokComponent, CheckboxWrapperComponent]
})

export class CheckboxModule { }
