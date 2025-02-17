import { Component } from '@angular/core';
import { PipesDemoComponentComponent } from './components/pipes-demo-component/pipes-demo-component.component';

@Component({
  selector: 'app-root',
  imports: [ PipesDemoComponentComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-tutorial';
}
