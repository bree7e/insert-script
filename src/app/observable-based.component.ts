import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
  Renderer2,
} from '@angular/core';
import { Observable, concat, EMPTY } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-observable-based',
  template: `
    <div id="observable-based">
      This content wil be replaced by observable based loaded script
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObservableBasedComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer2: Renderer2
  ) {}

  ngOnInit() {
    concat(
      this.loadScript$('https://code.jquery.com/jquery-3.3.1.slim.min.js'),
      this.loadTextScript$(`
        // setTimeout(() => {
          $( "#observable-based" ).html( "ObservableBasedComponent..." )
        // }, 1500);
      `),
    ).subscribe({
      next: s => console.log('next', s),
      complete: () => console.log('complete'),
    });
  }

  loadScript$(url: string): Observable<string> {
    return new Observable(subscriber => {
      const script = this.renderer2.createElement('script');
      script.src = url;
      script.onload = () => {
        subscriber.next(url);
        subscriber.complete();
      };
      script.onerror = (err: Event) => {
        subscriber.error(err);
      };
      this.renderer2.appendChild(this.document.body, script);
    });
  }

  loadTextScript$(text: string): Observable<string> {
    return new Observable(subscriber => {
      const script = this.renderer2.createElement('script');
      script.text = text;
      this.renderer2.appendChild(this.document.body, script);
      subscriber.next('text');
      subscriber.complete();
  });
  }
}
