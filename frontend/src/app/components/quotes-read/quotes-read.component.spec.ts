import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotesReadComponent } from './quotes-read.component';

describe('QuotesReadComponent', () => {
  let component: QuotesReadComponent;
  let fixture: ComponentFixture<QuotesReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotesReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotesReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
