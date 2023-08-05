import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product, List_Paged_Product, List_Product } from 'src/app/contracts/product';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable ,firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClientService) { }

  create(product: Create_Product, successCallBack?: any, errorCallBack?: (errorList: Array<{ key: string, value: Array<string> }>) => void) {
    this.http.post({
      controller: "products"
    }, product).subscribe(result => {
      successCallBack();
    }, (errorResponse: HttpErrorResponse) => {
      const errorList: Array<{ key: string, value: Array<string> }> = errorResponse.error;
      errorCallBack(errorList);
    })
  }

  async read(pageIndex:number =0,pageSize:number=5, successCallBack:()=>void,errorCallBack:(errorMessage:string)=>void): Promise<List_Paged_Product>{
    const list : Promise<List_Paged_Product> = this.http.get<List_Paged_Product>({
      controller:"products",
      queryString:`page=${pageIndex}&size=${pageSize}`
    }).toPromise();

    list.then(i=>successCallBack())
    .catch((errorResponse:HttpErrorResponse)=>errorCallBack(errorResponse.message));

    return await list;
  }

 async delete(id:string){
    const deleteObservable:Observable<any> = this.http.delete<any>({
      controller:"products"
    },id);

    await firstValueFrom(deleteObservable);
  }
}
