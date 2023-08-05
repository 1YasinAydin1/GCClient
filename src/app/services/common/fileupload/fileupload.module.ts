import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileuploadComponent } from './fileupload.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { BaseDialogComponent } from 'src/app/dialogs/base-dialog/base-dialog.component';



@NgModule({
  declarations: [
    FileuploadComponent
  ],
  imports: [
    CommonModule,
    NgxFileDropModule
  ],
  exports:[
    FileuploadComponent
  ]
})
export class FileuploadModule { }
