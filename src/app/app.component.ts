import { Component, OnInit } from '@angular/core';
import {getAjax} from './injections/get.injector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  get = getAjax();

  ngOnInit(): void {
    this.get('https://jsonplaceholder.typicode.com/todos/2')

  }

}
