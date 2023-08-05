import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent, SpinnerType } from 'src/app/base.component';
import {  List_Paged_Product, List_Product } from 'src/app/contracts/product';
import { RequestParameters } from 'src/app/services/common/http-client.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.css']
})
export class ListproductComponent extends BaseComponent implements OnInit {

  constructor(private http: ProductService, spinner: NgxSpinnerService
    , private toastr: ToastrService,private _liveAnnouncer: LiveAnnouncer) {
    super(spinner);
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  
  displayedColumns: string[] = ['name', 'onHand', 'price', 'createDate', 'updateDate','delete'];
  dataSource: MatTableDataSource<List_Product> = null;
  async ngOnInit() {
    await this.getProducts();
  }

  async getProducts() {
    this.showSpinner(SpinnerType.JellyBox)
    const response: List_Paged_Product = await this.http.read(
      this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 5,
      () => this.hideSpinner(SpinnerType.JellyBox),
      errorMessage => this.toastr.error(errorMessage))
    console.log(response.pagedProducts)
    this.dataSource = new MatTableDataSource<List_Product>(response.pagedProducts);
    this.paginator.length = response.countProducts;
    this.dataSource.sort = this.sort;
  }
  async onPage() {
    await this.getProducts();
  }

  requestParameters:RequestParameters = {
    controller:"products"
  }


  messageDialog:string = "Simek İstediğinize Emin Misiniz?";
}