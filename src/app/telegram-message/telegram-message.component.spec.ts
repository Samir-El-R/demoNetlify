import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelegramMessageComponent } from './telegram-message.component';

describe('TelegramMessageComponent', () => {
  let component: TelegramMessageComponent;
  let fixture: ComponentFixture<TelegramMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelegramMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelegramMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
