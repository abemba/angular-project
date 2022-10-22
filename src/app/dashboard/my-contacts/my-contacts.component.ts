import {Component, OnInit} from '@angular/core';
import {Contact} from "../../utils/classes/contact";
import {MyContactsComponentState} from "../../utils/types/my-contacts-component-state";
import {CommonService} from "../../services/common.service";

@Component({
    selector: 'app-my-contacts',
    templateUrl: './my-contacts.component.html',
    styleUrls: ['./my-contacts.component.scss']
})
export class MyContactsComponent implements OnInit {

    contacts: Contact[] = [];
    state: MyContactsComponentState = 'init';
    editContact: Contact | null = null;

    constructor(commonService: CommonService) {
        commonService.getContacts().subscribe(value => this.contacts = value )
    }

    ngOnInit(): void {
    }

    updateState(state: MyContactsComponentState) {
        this.state = state;
    }

    onClickSetEdit (target: Contact) {
        this.editContact = target;
        this.updateState('edit')
    }

}
