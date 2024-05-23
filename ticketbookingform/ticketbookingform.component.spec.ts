import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketbookingformComponent } from './ticketbookingform.component';

describe('TicketbookingformComponent', () => {
  let component: TicketbookingformComponent;
  let fixture: ComponentFixture<TicketbookingformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketbookingformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketbookingformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
