import {Component, OnInit} from '@angular/core';
import {SharedFund, SharedFundService} from "../../services/shared-fund.service";
import {firstValueFrom, lastValueFrom, timer} from "rxjs";
import {ConsentComponentState} from "../../utils/types/consent-component-state";

@Component({
    selector: 'app-consent',
    templateUrl: './consent.component.html',
    styleUrls: ['./consent.component.scss']
})
export class ConsentComponent implements OnInit {
    public consentTypes =
        [
            {value: "NONE", key: "NONE"},
            {value: "ANY", key: "ANY"},
            //{value: "FIXED", key:"FIXED"},
            {value: "MAJORITY", key: "MAJORITY"},
            {value: "MAJORITY SHARES", key: "MAJORITY_SHARES"},
            {value: "PERCENTAGE", key: "PERCENTAGE"},
            {value: "UNANIMOUS", key: "UNANIMOUS"},
            /*
            {value: "SELECTED ANY", key: "SELECTED_ANY"},
            {value: "SELECTED FIXED", key: "SELECTED_FIXED"},
            {value: "SELECTED MAJORITY", key:"SELECTED_MAJORITY"},
            {value: "SELECTED MAJORITY SHARES", key:"SELECTED_MAJORITY_SHARES"},
            {value: "SELECTED PERCENTAGE", key: "SELECTED_PERCENTAGE"},
            {value: "SELECTED UNANIMOUS", key: "SELECTED_UNANIMOUS"},

            {value: "SELECTED ANY LEADER", key: "SELECTED_ANY_LEADER"},
            {value: "SELECTED FIXED LEADER", key: "SELECTED_FIXED_LEADER"},
            {value: "SELECTED MAJORITY LEADER", key: "SELECTED_FIXED_LEADER"},
            {value: "SELECTED PERCENTAGE LEADER", key: "SELECTED_PERCENTAGE_LEADER"},
            {value: "SELECTED MAJORITY SHARES LEADER", key: "SELECTED_MAJORITY_SHARES_LEADER"},
             */
        ]
    public form: any = {
        TRANSFER_OUT: "NONE",
        UPDATE_POLICY: "NONE",
        INVITE: "NONE",
    }
    fund: SharedFund | null = null;
    isLoading: boolean = false;
    state: ConsentComponentState = "init"

    constructor(private fundService: SharedFundService) {
        fundService.getFundFromPath().subscribe(fund => {
            this.form.UPDATE_POLICY = fund.getPolicyUpdatePolicy();
            this.form.INVITE = fund.getInvitePolicy();
            this.form.TRANSFER_OUT = fund.getTransferOutPolicy();
            this.fund = fund;
        })
    }

    ngOnInit(): void {
    }

    async update() {
        this.isLoading = true;
        try {
            let approved = false;
            for (let [policy, value] of Object.entries(this.form)) {
                const request = this.fund?.updateRequestPolicy(policy, String(value));
                if (request) {
                    const response: any = await firstValueFrom(request);
                    if(response?.approved){
                        approved = true;
                    }
                    // delay
                    await firstValueFrom(timer(1000))
                }
            }
            if(approved){
                this.updateState('success')
            }else{
                this.updateState('pending')
            }
        }catch (exe){
            this.updateState('error')
        }
        this.isLoading = false;
    }

    updateState(state: ConsentComponentState) {
        this.state = state;
    }

}
