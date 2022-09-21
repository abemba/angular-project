import * as _ from "lodash";
import * as moment from "moment";
import { BankTransferState } from "./bank-transfer-state";
import { BankTransferType } from "./bank-transfer-type";
import { TransactionType } from "./transaction-type";

export var padZeros = function (id:string){
    id = id+""
    let ret = id;
    if(id.length<6){
      let x=6-id.length;
      for(; x>0; x--){
        ret = "0"+ret;
      }
    }
    return ret;
}

export let bankTransferSource = function (type:BankTransferType){
  let ret;
  switch(type){
    case BankTransferType.TRANSFER_OUT:
      ret = "Fund";
      break
    case BankTransferType.TRANSFER_IN:
      ret = "Bank";
    break;
  }
  return ret;
}

export let bankTransferTarget= function(type:BankTransferType){
  let ret;
  switch(type){
    case BankTransferType.TRANSFER_OUT:
      ret = "Bank";
      break
    case BankTransferType.TRANSFER_IN:
      ret = "Fund";
    break;
  }
  return ret;
}

export let bankTransferState = function(state:BankTransferState){
  let ret;
  switch(state){
    case BankTransferState.STATE_SCHEDULED:
      ret = "scheduled";
      break;
    case BankTransferState.STATE_AWAITING_BALANCE_UPDATE:
    case BankTransferState.STATE_AWAITING_BAMBORA_UPDATE:
    case BankTransferState.STATE_PROCESSING:
      ret = "processing";
      break;
    case BankTransferState.STATE_CANCELLED:
      ret = "cancelled";
      break;
    case BankTransferState.STATE_SUCCESS:
      ret = "success;"
      break;
    default:
      ret = "";
      break;
  }
  return ret;
}

export let daysToString = function(days:number){
  let str="";
  switch(days){
    case 30:
      str="monthly"
      break;
    case 14:
        str="bi-weekly"
        break;
    case 7:
      str="weekly"
      break;
    case 1:
      str="daily"
      break;
    default:
      str=days+" days"
      break;
  }
  return str;
}

export let sortTransaction = function(transactions: any[]){
  let sort = [];
    if(transactions.length>0){
      sort = _.sortBy(transactions,
        function(o){
          let time = -moment(o.created_at).unix(); 
          return time;
        })
    }
    return sort;
}

export let transactionDescription = function(type:TransactionType){
  let description = "";
  switch(type){
    case TransactionType.STRIPE_CARD_REFUND:
      description="card refund payment"
      break;
    case TransactionType.STRIPE_CARD:
      description="card payment"
      break;
    case TransactionType.LOCAL:
      description="inter-account transfer"
      break;
    case TransactionType.EMT_IN:
    case TransactionType.EMT_OUT:
      description="e-Transfer payment";
      break
    case TransactionType.BANK:
      description = "bank transfer";
    break;
  }
  return description;
}