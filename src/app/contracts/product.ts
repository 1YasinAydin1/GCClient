export class Create_Product {
    name:string;
    onhand:number;
    price:number;
}

export class List_Product {
    id:string;
    name:string;
    onhand:number;
    price:number;
    createdate:Date;
    updatedate:Date;
}

export class List_Paged_Product{
    pagedProducts:List_Product[];
    countProducts:number;
}