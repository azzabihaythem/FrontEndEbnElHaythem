import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'tc-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class TCIconComponent implements OnInit {
  @HostBinding('class') get class() {
    return 'tc-icon';
  };
  @Input() iconClass: string;
  @HostBinding('style.padding') @Input() padding: string | number;

  ngOnInit() { }
}
