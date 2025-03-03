import { Component , inject} from '@angular/core';
import { Router } from '@angular/router';
import { RemoveSpacePipe } from '../../sharedModules/pipes/remove-space.pipe';
import { FormsModule} from '@angular/forms';
import { WordCountPipe } from '../../sharedModules/pipes/word-count.pipe';
import { EllipsisPipe } from '../../sharedModules/pipes/ellipsis.pipe';
import { LimitedCharPipe } from '../../sharedModules/pipes/limited-char.pipe';
import { PluralizePipe } from '../../sharedModules/pipes/pluralize.pipe';
import { CasePipe } from '../../sharedModules/pipes/case.pipe';
import { NumberMaskingPipe } from '../../sharedModules/pipes/number-masking.pipe';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-pipes-demo-component',
  imports: [RemoveSpacePipe, FormsModule, WordCountPipe, EllipsisPipe, LimitedCharPipe, PluralizePipe, CasePipe, NumberMaskingPipe
   
  ],
  templateUrl: './pipes-demo-component.component.html',
  styleUrl: './pipes-demo-component.component.scss'
})
export class PipesDemoComponentComponent {

  authService = inject(AuthService);
  router = inject(Router);
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

   logout(){
    this.authService.logout();
    this.router.navigate(['/login-page']);
   }
}
