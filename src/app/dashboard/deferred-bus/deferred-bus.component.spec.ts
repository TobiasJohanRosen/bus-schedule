import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeferredBusComponent } from './deferred-bus.component';

describe('DeferredBusComponent', () => {
  let component: DeferredBusComponent;
  let fixture: ComponentFixture<DeferredBusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeferredBusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeferredBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
