import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base.component';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { CreateproductComponent } from './createproduct/createproduct.component';
import { ListproductComponent } from './listproduct/listproduct.component';
import { FileUploadOptions } from 'src/app/services/common/fileupload/fileupload.component';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService, public dialog: MatDialog) {
    super(spinner);
  }

  @ViewChild(ListproductComponent) listProductComponent
  
  openDialogAddProduct() {
    const dialogRef = this.dialog.open(CreateproductComponent);

    dialogRef.afterClosed().subscribe(i=>{
      debugger;
        this.listProductComponent.getProducts();
    })
  }
  ngOnInit(): void {
    this.showSpinner(SpinnerType.JellyBox);
  }


  @Output() FileUploadOptions:Partial<FileUploadOptions> = {
    action:"upload",
    controller:"products",
    explanation:"Resimleri",
    accept:".png, .jpg, .jpeg"
  }


}
