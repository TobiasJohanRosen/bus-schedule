import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSplashComponent } from './update-splash.component';

describe('UpdateSplashComponent', () => {
  let component: UpdateSplashComponent;
  let fixture: ComponentFixture<UpdateSplashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSplashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSplashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
