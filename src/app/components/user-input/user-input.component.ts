import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: [ './user-input.component.scss' ]
})
export class UserInputComponent {

  public from = '0';
  public to = '1';
  public formula = 'x';

  public onSubmit(form: NgForm): void {
    console.log('here', form.value);
  }
}
