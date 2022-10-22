import { Component, OnInit } from '@angular/core';
import {CommonService} from "../../../services/common.service";
import {SharedFund, SharedFundService} from "../../../services/shared-fund.service";
import {Contact} from "../../../utils/classes/contact";
import {ExistingContactsComponentState} from "../../../utils/types/existing-contacts-component-state";

@Component({
  selector: 'app-existing-contacts',
  templateUrl: './existing-contacts.component.html',
  styleUrls: ['./existing-contacts.component.scss']
})
export class ExistingContactsComponent implements OnInit {

  contacts:Contact[] = [];
  selectedContact: Contact | null = null;
  state: ExistingContactsComponentState = 'selectcontact';
  isLoading: boolean = false;
  Fund: SharedFund | null = null;

  constructor(commonService: CommonService, private sharedFundService: SharedFundService) {
      commonService.getContacts().subscribe(value => this.contacts = value)
      this.sharedFundService.getFundFromPath().subscribe(value => this.Fund = value)
  }

  ngOnInit(): void {
  }

  updateState(newState: ExistingContactsComponentState){
      this.state = newState;
  }

  confirmContact(){
      this.isLoading = true;
      const subscription = this.sharedFundService.getFundFromPath().subscribe(fund => {
          if(this.selectedContact){
            fund.invite(this.selectedContact).subscribe(
                {
                    next: () => {
                        this.isLoading = false;
                        this.updateState('success')
                        subscription.unsubscribe()
                    },
                    error: (error) => {
                        this.isLoading = false;
                        if(error.status==400){
                            this.updateState('alreadyamember')
                        }else{
                            this.updateState('error')
                        }
                        subscription.unsubscribe()
                    }
                }
            )
          }else{
              this.updateState('error')
          }
      })
  }

}
