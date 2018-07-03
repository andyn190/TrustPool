import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypoolsComponent } from './mypools.component';

describe('MypoolsComponent', () => {
  let component: MypoolsComponent;
  let fixture: ComponentFixture<MypoolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypoolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
