import { Component, HostBinding, Input, OnInit } from '@angular/core';

import { IPageData } from '../../../interfaces/page-data';
import { Content } from '../../../ui/interfaces/modal';
import { TCModalService } from '../../../ui/services/modal/modal.service';
import { environment } from './../../../../environments/environment';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @HostBinding('class') get class() {
    return 'footer';
  };
  @HostBinding('class.loaded') @Input() loaded: boolean;
  @HostBinding('class.boxed') @Input() boxed: boolean;

  @Input() pageData: IPageData;

  version: string;

  constructor(
    private modal: TCModalService
  ) {
    this.version = environment.version;
  }

  ngOnInit() { }

  // open modal window
  openModal<T>(body: Content<T>, header: Content<T> = null, footer: Content<T> = null, options: any = null) {
    this.modal.open({
      body: body,
      header: header,
      footer: footer,
      options: options
    });
  }
}
