import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import * as exampleUserModel from './example-user-model.json';

@Component({
  selector: 'app-dynamic-generate-form',
  templateUrl: './dynamic-generate-form.component.html',
  styleUrls: ['./dynamic-generate-form.component.scss']
})
export class DynamicGenerateFormComponent implements OnInit {
  public dynamicForm: FormGroup;
  
  public model: any = exampleUserModel;
  
  public preview: string = '';
  
  public ngOnInit(): void {
    this.dynamicForm = new FormGroup({});
    this.model.controls.forEach((control) => {
      this.dynamicForm.addControl(control.name, new FormControl());
    });
  }
  
  public onSubmit(): void {
    console.log(this.dynamicForm);
    this.preview = JSON.stringify(this.dynamicForm.value);
  }
}
