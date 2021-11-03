import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerFullscreenComponent } from './timer-fullscreen.component';

describe('TimerFullscreenComponent', () => {
  let component: TimerFullscreenComponent;
  let fixture: ComponentFixture<TimerFullscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimerFullscreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerFullscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
