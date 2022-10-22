import { Component, OnInit } from '@angular/core';
import {FundService} from "../../services/fund.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-fund',
  templateUrl: './create-fund.component.html',
  styleUrls: ['./create-fund.component.scss']
})
export class CreateFundComponent implements OnInit {

    newFundForm: any = { shared: false }
    isLoading: boolean = false;

  constructor(private fundService: FundService, private router: Router) { }

  ngOnInit(): void {
  }

  create(){
      this.isLoading = true;
        this.fundService.create(this.newFundForm).subscribe((data:any) => {
            setTimeout(()=>{
                this.isLoading = false;
                if(this.newFundForm.shared){
                    this.router.navigate(["shared-funds",data.fund_id])
                }else{
                    this.router.navigate(["private-funds",data.fund_id])
                }
            },6000)
        })
  }

}
