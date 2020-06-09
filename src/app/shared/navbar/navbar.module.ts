import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        BrowserAnimationsModule,
        CollapseModule.forRoot(),
        BsDropdownModule.forRoot(),
    ],
    declarations: [NavbarComponent],
    exports: [NavbarComponent],
})
export class NavbarModule {}
