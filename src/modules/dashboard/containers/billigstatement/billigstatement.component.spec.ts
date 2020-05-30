import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BilligstatementComponent } from './billigstatement.component';

describe('BilligstatementComponent', () => {
  let component: BilligstatementComponent;
  let fixture: ComponentFixture<BilligstatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilligstatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BilligstatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
