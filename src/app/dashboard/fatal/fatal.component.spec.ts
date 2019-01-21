import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FatalComponent } from './fatal.component';

describe('FatalComponent', () => {
  let component: FatalComponent;
  let fixture: ComponentFixture<FatalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FatalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FatalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
