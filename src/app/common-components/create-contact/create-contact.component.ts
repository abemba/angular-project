import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Contact} from "../../utils/classes/contact";
import {HttpClient} from "@angular/common/http";
import {CreateContactComponentState} from "../../utils/types/create-contact-component-state";

@Component({
    selector: 'app-create-contact',
    templateUrl: './create-contact.component.html',
    styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent implements OnInit, OnChanges {

    contactForm: any = {}
    state: CreateContactComponentState = "init"
    isLoading: boolean = true;
    @Output() onContinue: EventEmitter<boolean> = new EventEmitter<boolean>(true);
    @Output() onError: EventEmitter<boolean> = new EventEmitter<boolean>(true);
    @Input() edit: Contact | null = null;
    constructor(private httpClient: HttpClient) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes['edit']){
            this.contactForm.first_name = this.edit?.getFirstName();
            this.contactForm.last_name = this.edit?.getLastName();
            this.contactForm.phone = this.edit?.getPhone()
            this.contactForm.email = this.edit?.getEmail()
        }
    }

    ngOnInit(): void {
    }

    create() {
        const contact = new Contact({ collected_from: Contact.COLLECTED_FROM.CONTACT_PAGE },this.httpClient);
        contact.setEmail(this.contactForm.email);
        contact.setFirstName(this.contactForm.first_name);
        contact.setLastName(this.contactForm.last_name);
        contact.setPhone(this.contactForm.phone);
        contact.create().subscribe(
            {
                next: value => {
                    this.updateState('success')
                    this.isLoading = false;
                },
                error: () => {
                    this.isLoading = false
                    this.updateState('error')
                }
            })
    }

    updateState (state: CreateContactComponentState) {
        this.state = state;
    }

    emitContinue () {
        this.onContinue.emit()
    }

}
