import { Component, OnInit, ViewChild } from '@angular/core';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardComponent, StripeService } from 'ngx-stripe';

@Component({
  selector: 'app-in-pipe-card',
  templateUrl: './in-pipe-card.component.html',
  styleUrls: ['./in-pipe-card.component.scss']
})
export class InPipeCardComponent implements OnInit {

  public  state: String = "nocard"

  @ViewChild(StripeCardComponent)
  card!: StripeCardComponent;

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
    hidePostalCode:true
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };


  public existing_cards: any[] = 
  [
    {brand:"visa", exp_month:10,exp_year:2028},
    {brand:"mastercard", exp_month:10,exp_year:2028},
    {brand:"abembacard", exp_month:10,exp_year:2028},
  ];

  public recurring: boolean = false;
  public frequency = "dail";
  public frequency_label = "daily";
  public start_date = new Date();

  public fund: any = {}
  public transfer_amount: string ="100";
  public selected_card = "Visa";
  public processing_fee = 100*0.05;
  public charge_total = 100*1.05;




  constructor(private stripeService: StripeService) { }

  ngOnInit(): void {
    
  }

  updateState(state:String){
    this.state = state
  }

  cardCompleted(){
  }

  createToken(): void {
    this.stripeService
      .createToken(this.card.element)
      .subscribe((result) => {
        if (result.token) {
          // Use the token
        } else if (result.error) {
          // Error creating the token
        }
      });
  }
}
