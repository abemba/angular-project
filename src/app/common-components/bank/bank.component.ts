import {Component, Input, OnInit} from '@angular/core';
import {FundPipesService} from "../../services/fund-pipes.service";
import {Bank} from "../../utils/classes/bank";
import * as moment from "moment/moment";
import {MatCalendarCellClassFunction} from "@angular/material/datepicker";
import { FundService} from "../../services/fund.service";
import {Chargeable} from "../../utils/classes/chargeable";
import {Percent} from "../../utils/classes/percent";
import {Fund} from "../../utils/classes/fund";
import {BankTransferDirection} from "../../utils/enums/bank-transfer-direction";
import {BankComponentState} from "../../utils/types/bank-component-state";
import {Figure} from "../../utils/classes/figure";

@Component({
    selector: 'app-bank',
    templateUrl: './bank.component.html',
    styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {

    @Input() TRANSFER_DIRECTION: BankTransferDirection = "IN"
    public bank_list: Bank[] = []
    public isLoading: boolean = false;
    public state: BankComponentState = "init";
    public returnTo: BankComponentState = "chargebank"
    public transferFee: Figure = Figure.fromDollars(0);
    public min_date = moment();
    public max_date = moment().add(30, 'days');
    public maximum_transfer_out_amount: number = this.TRANSFER_DIRECTION =="OUT" ? 0: 1000000000;
    public currentFund: Fund | null = null;
    public newBankForm: any = {};
    public transferForm: any = {
        selected_date: this.min_date,
        recurring: false,
        frequency: 30
    };
    public dateClass: MatCalendarCellClassFunction<moment.Moment> = (cell, view) => {
        return '';
    }

    constructor(private pipeService: FundPipesService, fundService: FundService) {
        this.pipeService.getBanks().subscribe(
            {
                next: value => {
                    this.bank_list = value;
                    this.setInitialState()
                }
            }
        )

        fundService.getFromPath().subscribe(fund => {
            this.currentFund = fund;
            if(this.TRANSFER_DIRECTION == "OUT"){
                this.maximum_transfer_out_amount = fund.getBalance().inDollars()
            }
        })
        pipeService.getBankFees().subscribe(value => this.transferFee = value)
    }

    ngOnInit(): void {
    }

    updateState(state: BankComponentState) {
        this.state = state
    }

    addBank() {
        this.isLoading = true;
        this.pipeService.createBank(this.newBankForm).subscribe(
            {
                next: value => {
                    this.isLoading = false;
                    this.updateState("addbanksuccess")
                },
                error: err => {
                    this.isLoading = false;
                    this.returnTo = "addbank"
                    this.updateState("error")
                }
            }
        )
    }

    goToReturnTo() {
        this.updateState(this.returnTo);
    }

    setInitialState() {
        if(this.state == "init"){
            if (this.bank_list.length > 0) {
                this.state = "chargebank"
            } else {
                this.state = "nobank"
            }
        }
    }

    transfer() {
        const amountFigure = Figure.fromDollars(this.transferForm.amount);
        // Applicable only to transfer outs
        // Assert that the fees added plus the amount does not
        // Exceed available balance
        const chargeable = new Chargeable(amountFigure, this.transferFee, Percent.fromPercent(0))
        if(chargeable.getCharge().inDollars() > this.maximum_transfer_out_amount && this.TRANSFER_DIRECTION=="OUT"){
            this.updateState('insf');
            return;
        }

        // Attempt transfer
        this.isLoading = true;

        /**
         * SELECTS FUNCTION TO USE BASED ON DIRECTION
         */
        let moveMoney = 'transferIn';
        if(this.TRANSFER_DIRECTION=="OUT"){
            moveMoney = 'transferOut'
        }


        this.transferForm.target[moveMoney](this.currentFund, amountFigure, this.transferForm.recurring, this.transferForm.frequency, this.transferForm.selected_date)
            .subscribe(
                {
                    next: (data: any) => {
                        this.isLoading = false;
                        if(typeof(data.request_number) == 'undefined' || data.approved){
                            this.updateState("chargebanksuccess")
                        }else if(!data.approved && typeof(data.request_number) !== 'undefined'){
                            this.updateState('pendingapproval')
                        }
                    }
                    ,
                    error: (err: any) => {
                        this.isLoading = false;
                        this.updateState("error")
                    }
                }
            )
    }

    daysToString(days: any) {
        let str = `every ${days} days`;
        switch (days) {
            case 1:
            case '1':
                str = 'daily';
                break;
            case 7:
            case '7':
                str = "weekly"
                break;
            case 30:
            case '30':
                str = 'monthly';
                break;
            case 14:
            case '14':
                str = 'bi-weekly';
                break;
            default:
                break;
        }
        return str;
    }


}
