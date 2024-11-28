import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterComponent } from './master.component';
import { ViewProductsComponent } from '../../pages/view-products/view-products.component';
import { CheckoutComponent } from '../../pages/checkout/checkout.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CategoryComponent } from '../../pages/category/category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductComponent } from '../../pages/product/product.component';
import { ConfirmDialogComponent } from '../../pages/confirm-dialog/confirm-dialog.component';
import { MyOrdersComponent } from '../../pages/my-orders/my-orders.component';



@NgModule({
  declarations: [
    MasterComponent,
    ViewProductsComponent,
    CheckoutComponent,
    CategoryComponent,
    ProductComponent,
    ConfirmDialogComponent,
    MyOrdersComponent,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    MatTooltipModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatRadioModule,
  ],
  exports: [MasterComponent],
  bootstrap: [MasterComponent],
})
export class MasterModule { }
