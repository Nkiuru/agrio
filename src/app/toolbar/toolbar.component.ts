import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() showSearch: boolean;
  @Input() searchTerm: string;
  @Output() searchTermChange = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  update() {
    this.searchTermChange.emit(this.searchTerm);
  }

}
