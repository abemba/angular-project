import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-out-pipe-emt',
  templateUrl: './out-pipe-emt.component.html',
  styleUrls: ['./out-pipe-emt.component.scss']
})
export class OutPipeEmtComponent implements OnInit {

  public default_response = "algofame";
  public default_challenge = "algofame";

  public new_contact: boolean = false;

  public existing_contacts: any[] = 
  [
    {name:"John Doe", email:"test@example.com"},
    {name:"John Doe 1", email:"test1@example.com"},
    {name:"John Doe 2", email:"test2@example.com"},
  ]

  state: String = "send"

  constructor() { }

  ngOnInit(): void {
  }

  onClickUpdateState(state:String){
      this.state = state
  }

}
