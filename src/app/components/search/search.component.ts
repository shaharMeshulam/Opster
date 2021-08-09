import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild('input', { static: true }) input?: ElementRef;
  subscription?: Subscription;

  constructor(public searchService: SearchService) { }

  ngOnInit() {
    this.subscription = fromEvent<KeyboardEvent>(this.input?.nativeElement, 'keyup')
      .subscribe((event: KeyboardEvent) => {
        const value = this.input?.nativeElement.value.trim();
        this.searchService.query.next(value);
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
