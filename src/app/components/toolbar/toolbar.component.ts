import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() showSearch: boolean;
  @Input() searchTerm: string;
  @Input() showBackButton: boolean;
  @Input() mapSearch: boolean;
  @Output() searchTermChange = new EventEmitter();
  isSearchPage: boolean;
  @ViewChild('search') search;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.isSearchPage = this.router.isActive('search', false);
    if (this.isSearchPage) {
      setTimeout(() => {
        this.search.setFocus();
      }, 250);
    }
  }

  update() {
    this.searchTermChange.emit(this.searchTerm);
  }

  openSearchPage() {
    this.router.navigate(['search']).catch();
  }

  goBack() {
    this.router.navigate(['tabs/home']).catch();
  }

}
