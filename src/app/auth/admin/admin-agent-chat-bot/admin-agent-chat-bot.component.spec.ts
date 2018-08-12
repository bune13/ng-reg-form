import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAgentChatBotComponent } from './admin-agent-chat-bot.component';

describe('AdminAgentChatBotComponent', () => {
  let component: AdminAgentChatBotComponent;
  let fixture: ComponentFixture<AdminAgentChatBotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAgentChatBotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAgentChatBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
