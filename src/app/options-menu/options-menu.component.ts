import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-options-menu',
    templateUrl: './options-menu.component.html',
    styleUrls: ['./options-menu.component.scss'],
})
export class OptionsMenuComponent {
    //move this to popup to within file upload component

    users: string[]
    selectedUser = ''

    constructor() {
        this.users = ['user1', 'set these dynamically']
    }
}
