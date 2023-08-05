import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent, SpinnerType } from 'src/app/base.component';
import { Create_Product } from 'src/app/contracts/product';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.css']
})
export class CreateproductComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, public dialogRef: MatDialogRef<CreateproductComponent>,
    private productService: ProductService, private toastr: ToastrService) {
    super(spinner);
  }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddProduct(NameInput: HTMLInputElement, OnHandInput: HTMLInputElement, PriceInput: HTMLInputElement) {
    this.showSpinner(SpinnerType.JellyBox);
    const cProduct: Create_Product = new Create_Product();
    cProduct.name = NameInput.value;
    cProduct.onhand = parseInt(OnHandInput.value);
    cProduct.price = parseInt(PriceInput.value);

    this.productService.create(cProduct, () => {

      this.hideSpinner(SpinnerType.JellyBox);
      this.toastr.success("Ürün Başarı ile Eklenmiştir.");
      this.onNoClick();

    }, errorList => {

      this.hideSpinner(SpinnerType.JellyBox);
      errorList.forEach((v, index) => {
        this.toastr.error(v.value[0]);
      })

    });
  }
}
