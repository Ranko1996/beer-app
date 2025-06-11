import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerDetailsModalComponent } from './beer-details-modal.component';

describe('BeerDetailsModalComponent', () => {
  let component: BeerDetailsModalComponent;
  let fixture: ComponentFixture<BeerDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeerDetailsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BeerDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
