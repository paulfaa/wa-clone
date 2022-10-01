import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'options-menu',
  templateUrl: './options-menu.component.html',
  styleUrls: ['./options-menu.component.scss']
})
export class OptionsMenuComponent implements OnInit {

  selected = 'option2';

  constructor() { }

  ngOnInit(): void {
  }

}
