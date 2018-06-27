import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersgroupComponent } from './usersgroup.component';

describe('UsersgroupComponent', () => {
  let component: UsersgroupComponent;
  let fixture: ComponentFixture<UsersgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
