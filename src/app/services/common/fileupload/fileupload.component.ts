import { Component, Input, OnInit } from '@angular/core';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BaseDialogComponent, DialogState } from 'src/app/dialogs/base-dialog/base-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent {

  constructor(private http: HttpClientService, private tost: ToastrService, private dialog: MatDialog) { }
  public files: NgxFileDropEntry[];
  fileData: FormData;

  @Input() options: Partial<FileUploadOptions>

  public selectedFiles(files: NgxFileDropEntry[]) {


    this.files = files;
    this.fileData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        this.fileData.append(_file.name, _file, file.relativePath);
      })
    }


  }

  onClickUpload() {
    const dialogRef = this.dialog.open(BaseDialogComponent, {
      data: DialogState.Yes
    });
    dialogRef.componentInstance.messageDialog = `${this.options.explanation} Yüklemek İstediğinize Emin Misiniz?`;
    dialogRef.afterClosed().subscribe(i => {
      if (i == DialogState.Yes) {
        this.uploadFiles();
      }

    })
  }

  uploadFiles() {
    this.http.post({
      controller: this.options.controller,
      action: this.options.action,
      queryString: this.options.queryString,
      httpHeader: new HttpHeaders({ "responseType": "blob" })
    }, this.fileData).subscribe(i => {
      this.tost.success("Başarı İle Yüklenmiştir");
    }, (error: HttpErrorResponse) => {
      this.tost.error("Başarısız - " + error.message);
    })

  }
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
}
