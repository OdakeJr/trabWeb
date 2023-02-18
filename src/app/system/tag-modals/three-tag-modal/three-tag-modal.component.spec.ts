import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeTagModalComponent } from './three-tag-modal.component';

describe('ThreeTagModalComponent', () => {
  let component: ThreeTagModalComponent;
  let fixture: ComponentFixture<ThreeTagModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeTagModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreeTagModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
