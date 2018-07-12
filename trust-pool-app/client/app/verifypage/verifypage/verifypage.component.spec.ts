import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifypageComponent } from './verifypage.component';

describe('VerifypageComponent', () => {
  let component: VerifypageComponent;
  let fixture: ComponentFixture<VerifypageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifypageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
