import {
  Component,
  Inject,
  Renderer2,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'insert-script';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer2: Renderer2
  ) {}

  ngOnInit(): void {
    // const textScript = this.renderer2.createElement('script');
    // textScript.type = 'text/javascript';
    // textScript.src = 'https://code.jquery.com/jquery-3.3.1.slim.min.js';
    // this.renderer2.appendChild(this.document.body, textScript);

    const srcScript = this.renderer2.createElement('script');
    srcScript.type = 'text/javascript';
    srcScript.text = `
      (function() {
        console.log('Hello from Siberia!')
      }());
    `;
    this.renderer2.appendChild(this.document.body, srcScript);
  }




}
