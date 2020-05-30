import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceprofilesComponent } from './invoiceprofiles.component';

describe('InvoiceprofilesComponent', () => {
  let component: InvoiceprofilesComponent;
  let fixture: ComponentFixture<InvoiceprofilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceprofilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceprofilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
