import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'options-menu',
  templateUrl: './options-menu.component.html',
  styleUrls: ['./options-menu.component.scss']
})
export class OptionsMenuComponent implements OnInit {

  //move this to popup to within file upload component

  users: string[];
  selectedUser = '';

  constructor() {
    this.users = ["user1", "set these dynamically"];
  }

  ngOnInit(): void {
  }

}
