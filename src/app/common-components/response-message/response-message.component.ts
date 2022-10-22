import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-response-message',
  templateUrl: './response-message.component.html',
  styleUrls: ['./response-message.component.scss']
})
export class ResponseMessageComponent implements OnInit {

    @Input() message: string = ""
    @Input() icon: string = "mdi-emoticon-happy-outline text-success"
    @Input() buttonText: string = "continue"
    @Output() onContinue: EventEmitter<boolean> = new EventEmitter<boolean>(true);
  constructor() { }

  ngOnInit(): void {
  }

  emit(){
      this.onContinue.emit(true);
  }

}
