import {ChangeDetectionStrategy, Component, inject, InjectFlags, OnInit, Optional} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HighlightDirective} from '../../directives/highlight.directive';
import {FormControl, FormGroup, ReactiveFormsModule, UntypedFormControl} from '@angular/forms';
import {LogService} from '../../services/log.service';
import {getAjax} from '../../injections/get.injector';

interface Bid {
  name: UntypedFormControl;
  payout: UntypedFormControl;
  new: FormControl<string |null>;
}

// ng g c custom --standalone
@Component({
  selector: 'app-custom',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HighlightDirective
  ],
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
   {provide: LogService, useValue: {info(m: string) {console.log(`custom logger -> ${m}`)} }}
  ]
})
export class CustomComponent implements OnInit {

  formGroup!: FormGroup<Bid>;

  //#region injection functions

  logger = inject(LogService, InjectFlags.Optional)?.info;
  get = getAjax()

  //#endregion


  ngOnInit(): void {
    this.formGroup = new FormGroup({
      name: new UntypedFormControl('adsf'),
      payout: new UntypedFormControl(null),
      new: new FormControl('asd')
    });



    this.formGroup.setValue({name: '1',payout:10,new:'dsa'})

    this.formGroup.controls.name.setValue('asd')
  }

  async fetch(){
    const res = await this.get('https://jsonplaceholder.typicode.com/todos/1');
    //console.log(res)
  }

}
