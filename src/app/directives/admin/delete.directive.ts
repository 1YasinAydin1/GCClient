import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SpinnerType } from 'src/app/base.component';
import { BaseDialogComponent, DialogState } from 'src/app/dialogs/base-dialog/base-dialog.component';
import { HttpClientService, RequestParameters } from 'src/app/services/common/http-client.service';
declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private http: HttpClientService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private toast : ToastrService) {

    const span = this.renderer.createElement('span');
    const text = this.renderer.createText('delete');

    this.renderer.addClass(span, 'material-icons');
    this.renderer.setStyle(span, 'color', 'rgb(255, 0, 0)');
    this.renderer.setStyle(span, 'cursor', 'pointer');

    this.renderer.appendChild(span, text);
    this.renderer.appendChild(this.elementRef.nativeElement, span);

  }

  @Input() id: string;
  @Input() messageDialog: string;
  @Input() requestParameters: RequestParameters;
  @Output() callback: EventEmitter<any> = new EventEmitter();

  async onDelete() {
    debugger;
    this.spinner.show(SpinnerType.ElasticBall);
    const td: HTMLTableCellElement = this.elementRef.nativeElement;
    await this.http.delete<any>(this.requestParameters,this.id).subscribe(i=>{
      $(td.parentElement).fadeOut(500, () => {
        this.callback.emit();
        this.toast.success("Başarı İle Silinmiştir");
        this.spinner.hide(SpinnerType.ElasticBall);
      });
    });
  
  }

  @HostListener("click")
  openDeleteDialog() {
    const dialogRef = this.dialog.open(BaseDialogComponent, {
      data: DialogState.Yes
    });
    dialogRef.componentInstance.messageDialog = this.messageDialog;

    dialogRef.afterClosed().subscribe(i => {
      if (i == DialogState.Yes) {
        this.onDelete();
      }
    })
  }

}
