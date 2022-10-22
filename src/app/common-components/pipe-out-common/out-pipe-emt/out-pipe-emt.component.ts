import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import {Contact} from "../../../utils/classes/contact";
import { FundService} from "../../../services/fund.service";
import {Fund} from "../../../utils/classes/fund";
import {FundPipesService} from "../../../services/fund-pipes.service";
import {EmtConfig} from "../../../utils/classes/emt-config";
import {data} from "autoprefixer";
import {Figure} from "../../../utils/classes/figure";
import {OutPipeEmtComponentState} from "../../../utils/types/out-pipe-emt-component-state";

@Component({
  selector: 'app-out-pipe-emt',
  templateUrl: './out-pipe-emt.component.html',
  styleUrls: ['./out-pipe-emt.component.scss']
})
export class OutPipeEmtComponent implements OnInit {

  public emtConfig: EmtConfig | null = null;

  state: OutPipeEmtComponentState  = "send";
  isLoading: boolean = false;
  fund: Fund | null = null;
  maximum_transfer_amount: Figure = Figure.fromDollars(0);
  transferForm: any = { collected_from: Contact.COLLECTED_FROM.EMT, recurring: false};
  public contacts: Contact[] = [];

  constructor(private common: CommonService, fund: FundService, pipeService: FundPipesService) {
      common.getContacts().subscribe( list => this.contacts = list)
      fund.getFromPath().subscribe(value => {
          this.fund = value;
          this.maximum_transfer_amount = value.getBalance();
      } )

      pipeService.getEmtConfig().subscribe( config => this.emtConfig = config)
  }

  ngOnInit(): void {
  }

  confirmSend () {
      this.isLoading = true;
      if(this.contacts.length==0 || this.transferForm.new_contact_flag==true){
        const tranferFormCopy = Object.assign({}, this.transferForm)
        delete tranferFormCopy.contact;
          // new contact
          const contact = this.common.newContactInstance(tranferFormCopy)
          contact.create().subscribe({
              next: value => this.send(Figure.fromDollars(this.transferForm.amount), contact),
              error: () => {
                  this.isLoading = false;
                  this.onClickUpdateState("sendfailed")
              }
          })
      }else{
          this.send(Figure.fromDollars(this.transferForm.amount), this.transferForm.contact)
      }
  }

  send(amount: Figure, contact: Contact){
      this.fund?.send(Figure.fromDollars(this.transferForm.amount), contact, this.transferForm.recurring ,this.transferForm.message).subscribe({
          next: data => {
              this.isLoading = false;
              if(data.request_number && !data.approved){
                  this.onClickUpdateState("pendingapproval")
                  return;
              }

              this.onClickUpdateState("sendsuccess")
          },
          error: () => {
              this.isLoading = false;
              this.onClickUpdateState("sendfailed")
          }

  })
  }

  onClickUpdateState(state: OutPipeEmtComponentState ){
      this.state = state
  }

}
