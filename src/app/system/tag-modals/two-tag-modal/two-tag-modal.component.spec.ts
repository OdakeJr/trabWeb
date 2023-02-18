import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoTagModalComponent } from './two-tag-modal.component';

describe('TwoTagModalComponent', () => {
  let component: TwoTagModalComponent;
  let fixture: ComponentFixture<TwoTagModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoTagModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoTagModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
