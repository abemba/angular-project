import {Component, OnInit} from '@angular/core';
import {NewContactComponentState} from "../../../utils/types/new-contact-component-state";
import {Contact} from "../../../utils/classes/contact";
import {HttpClient} from "@angular/common/http";
import {SharedFund, SharedFundService} from "../../../services/shared-fund.service";

@Component({
    selector: 'app-new-contact',
    templateUrl: './new-contact.component.html',
    styleUrls: ['./new-contact.component.scss']
})
export class NewContactComponent implements OnInit {
    inviteForm: any = {};
    state: NewContactComponentState = "init"
    isLoading: boolean = false;
    fund: SharedFund | null = null;

    constructor(private http:HttpClient, private sharedFundService: SharedFundService) {
        this.sharedFundService.getFundFromPath().subscribe(value => this.fund = value)
    }

    invite(){
        this.isLoading = true;
        const contact = new Contact({ collected_from: Contact.COLLECTED_FROM.INVITE },this.http);
        contact.setEmail(this.inviteForm.email);
        contact.setFirstName(this.inviteForm.first_name);
        contact.setLastName(this.inviteForm.last_name);
        contact.setPhone(this.inviteForm.phone);
        contact.create().subscribe(
            {
                next: value => {
                    this.fund?.invite(contact).subscribe(
                        {
                            next: value => {
                                this.isLoading = false;
                                this.updateState('success')
                            },
                            error: (error) => {
                                this.isLoading = false;
                                if(error.status==400){
                                    this.updateState('alreadyamember')
                                }else{
                                    this.updateState('error')
                                }
                            }
                        })
                },
                error: () => {
                    this.isLoading = false
                    this.updateState('error')
                }
            })
    }

    updateState (state: NewContactComponentState){
        this.state = state;
    }

    ngOnInit(): void {
    }

}
