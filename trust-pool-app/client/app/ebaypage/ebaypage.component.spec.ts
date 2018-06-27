import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EbaypageComponent } from './ebaypage.component';

describe('EbaypageComponent', () => {
  let component: EbaypageComponent;
  let fixture: ComponentFixture<EbaypageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EbaypageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EbaypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
