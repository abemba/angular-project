import {Component, OnInit, ViewChild} from '@angular/core';
import {StripeCardElementOptions, StripeElementsOptions} from '@stripe/stripe-js';
import {StripeCardComponent, StripeService} from 'ngx-stripe';
import {FundPipesService} from "src/app/services/fund-pipes.service";
import {Card} from "src/app/utils/classes/card";
import {CardComponentState} from "src/app/utils/types/card-component-state";
import {subscribeOn} from "rxjs";
import * as moment from "moment";
import {MatCalendarCellClassFunction} from "@angular/material/datepicker";
import {ChargeableBase} from "../../../utils/classes/chargeablebase";
import {daysToString} from "../../../utils/functions";
import {Fund} from "../../../utils/classes/fund";
import {FundService} from "../../../services/fund.service";
import {Figure} from "../../../utils/classes/figure";

@Component({
    selector: 'app-in-pipe-card',
    templateUrl: './in-pipe-card.component.html',
    styleUrls: ['./in-pipe-card.component.scss']
})
export class InPipeCardComponent implements OnInit {


    @ViewChild(StripeCardComponent) card!: StripeCardComponent;
    cardOptions: StripeCardElementOptions = {
        style: {
            base: {
                iconColor: '#666EE8',
                color: '#31325F',
                fontWeight: '300',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSize: '18px',
                '::placeholder': {
                    color: '#CFD7E0'
                }
            }
        },
        hidePostalCode: true
    };
    elementsOptions: StripeElementsOptions = {
        locale: 'en',
        loader: 'always'
    };
    public fund: Fund | null = null;
    public min_date = moment();
    public max_date = moment().add(30, 'days');
    public dateClass: MatCalendarCellClassFunction<moment.Moment> = (cell, view) => ' '
    public state: CardComponentState = "init"
    public cards: Card[] = []
    public addCardForm: any = {ready: false}
    public transferForm: any = {recurring: false, minimum_charge: 1, start_date: this.min_date, frequency: 30}
    public isLoading: boolean = false;
    chargeableBase: ChargeableBase | null = null;


    constructor(private stripeService: StripeService, private pipesService: FundPipesService, fundService: FundService) {
        this.pipesService.getCards().subscribe({
            next: value => {
                this.cards = value
                if(this.state == 'init'){
                    this.resetState()
                }
            }
        })
        this.pipesService.getCardFees().subscribe(value => this.chargeableBase = value);
        fundService.getFromPath().subscribe( value => this.fund = value)
    }

    ngOnInit(): void {

    }

    updateState(state: CardComponentState) {
        this.state = state
    }

    getFrequencyLabel (){
        return daysToString(this.transferForm.frequency)
    }

    resetState () {
        if (this.cards.length > 0) {
            this.updateState('chargecard')
        } else {
            this.updateState('nocard')
        }
    }

    onCardNumberChange(event: any) {
        this.addCardForm.feedback = '';
        if(event.complete){
            this.addCardForm.ready = true;
        }else{
            this.addCardForm.ready = false;
        }
    }

    onAddCard(): void {
        this.isLoading = true;
        this.stripeService
            .createToken(this.card.element)
            .subscribe((result) => {
                if (result.token) {
                    // Use the token
                    this.pipesService.createCard({token: result.token.id }).subscribe({
                        next: value => {
                            this.isLoading = false;
                            this.updateState('addcardsuccess')
                        },
                        error: err => {
                            this.isLoading = false;
                            this.updateState('error')
                        }
                    })
                } else if (result.error) {
                    // Error creating the token
                    this.isLoading = false;
                    this.addCardForm.feedback = result.error.message
                }
            });
    }

    chargeCard () {
        this.isLoading = true;
        const localForm = Object.assign({}, this.transferForm)
        delete localForm.selected_card;
        delete localForm.amount;
        if(this.fund){
            this.transferForm.selected_card.credit(this.fund,Figure.fromDollars(this.transferForm.amount), localForm).subscribe(
                {
                    next: () => {
                        this.isLoading = false;
                        this.updateState('chargecardsuccess')
                    },
                    error: () => {
                        this.isLoading = false;
                        this.updateState('error')
                    }
                }
            )
        }
    }
}
