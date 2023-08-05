import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
export class BaseComponent {
  constructor(private spinner : NgxSpinnerService) { }

  showSpinner(SpinnerType:SpinnerType){
    this.spinner.show(SpinnerType);

    setTimeout(() => {
    this.spinner.hide(SpinnerType);
    }, (1000));
  }

  hideSpinner(SpinnerType:SpinnerType){
    this.spinner.hide(SpinnerType);
  }
}

export enum SpinnerType{
    JellyBox = "jellyboxspinner",
    ElasticBall = "ballelasticdots"
}
