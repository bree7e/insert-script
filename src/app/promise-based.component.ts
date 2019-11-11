import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
  Renderer2,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-promise-based',
  template: `
    <div id="promise-based">
      This content wil be replaced by promise based loaded script
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromiseBasedComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer2: Renderer2
  ) {}

  ngOnInit() {
    this.loadScript('https://code.jquery.com/jquery-3.3.1.slim.min.js').then(
      () =>
        this.loadTextScript(`
          setTimeout(() => {
            $( "#promise-based" ).html( "PromiseBasedComponent..." )
          }, 2000);
      `)
    );
  }

  loadTextScript(text: string) {
    return new Promise(resolve => {
      const script = this.renderer2.createElement('script');
      script.text = text;
      this.renderer2.appendChild(this.document.body, script);
      resolve();
    });
  }

  loadScript(url: string) {
    return new Promise((resolve, reject) => {
      const script = this.renderer2.createElement('script');
      script.src = url;
      script.onload = resolve;
      script.onerror = reject;
      this.renderer2.appendChild(this.document.body, script);
    });
  }
}
