import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-admin-agent-chat-bot',
  templateUrl: './admin-agent-chat-bot.component.html',
  styleUrls: ['./admin-agent-chat-bot.component.css'],
  animations:[
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class AdminAgentChatBotComponent implements OnInit {
  state = 'out'

  constructor() { }

  ngOnInit() {
  }

  onAnimate(){
    this.state == 'in' ? this.state = 'out' : this.state = 'in'
  }

  onClickPushPullBox(){
    this.onAnimate();
  }

  onClickClosePushPullBox(){
    this.onAnimate();
  }

}
