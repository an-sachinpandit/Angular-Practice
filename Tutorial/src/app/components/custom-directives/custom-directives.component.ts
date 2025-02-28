import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextColorDirective } from '../../sharedModules/directives/behavioral/text-color.directive';
import { DisableButtonDirective } from '../../sharedModules/directives/behavioral/disable-button.directive';
import { ShowHideDirective } from '../../sharedModules/directives/structural/show-hide.directive';
import { OddEvenCounterDirective } from '../../sharedModules/directives/structural/odd-even-counter.directive';

@Component({
  selector: 'app-custom-directives',
  imports: [FormsModule, TextColorDirective, DisableButtonDirective, ShowHideDirective, OddEvenCounterDirective],
  templateUrl: './custom-directives.component.html',
  styleUrl: './custom-directives.component.scss'
})
export class CustomDirectivesComponent {
  protected userInputColor : string = '';
  protected userInputNumber! : number;
  protected isVisible : boolean = false;
}
