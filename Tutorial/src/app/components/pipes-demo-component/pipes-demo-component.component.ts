import { Component } from '@angular/core';
import { RemoveSpacePipe } from '../../pipes/remove-space.pipe';
import { FormsModule} from '@angular/forms';
import { WordCountPipe } from '../../pipes/word-count.pipe';
import { EllipsisPipe } from '../../pipes/ellipsis.pipe';
import { LimitedCharPipe } from '../../pipes/limited-char.pipe';
import { PluralizePipe } from '../../pipes/pluralize.pipe';
import { CasePipe } from '../../pipes/case.pipe';
import { NumberMaskingPipe } from '../../pipes/number-masking.pipe';
@Component({
  selector: 'app-pipes-demo-component',
  imports: [RemoveSpacePipe, FormsModule, WordCountPipe, EllipsisPipe, LimitedCharPipe, PluralizePipe, CasePipe, NumberMaskingPipe
   
  ],
  templateUrl: './pipes-demo-component.component.html',
  styleUrl: './pipes-demo-component.component.scss'
})
export class PipesDemoComponentComponent {
   userInput: string = "";
   
   WordCounter: string ="";

   protected names: string[] = [
    "Sachin Pandit", "Shweta Wagh", "Vishal Bharti", "Ravi Yadav", "Alok Prasad", "Shushant Jadhav",
    "John Doe"
   ]

   protected limitedchar = "";

   protected count: number = 1;

   protected name : string = "";

   protected masking : string = "";
}
