import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
declare var $: any
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GCClient';

  constructor(private toastr: ToastrService) {
    // toastr.success("Merhaba", "Dünya");
  }
}
