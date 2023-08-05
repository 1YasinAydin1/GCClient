import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { CreateproductComponent } from './createproduct/createproduct.component';
import { ListproductComponent } from './listproduct/listproduct.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DeleteDirective } from 'src/app/directives/admin/delete.directive';
import { FileuploadModule } from 'src/app/services/common/fileupload/fileupload.module';
import { BaseDialogComponent } from 'src/app/dialogs/base-dialog/base-dialog.component';
@NgModule({
  declarations: [
    ProductsComponent,
    CreateproductComponent,
    ListproductComponent,
    DeleteDirective,
    BaseDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: ProductsComponent }
    ]),
    MatInputModule, MatButtonModule, LayoutModule, MatDialogModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule,
    FileuploadModule
  ], exports: [
    MatSortModule
  ]
})
export class ProductsModule { }
