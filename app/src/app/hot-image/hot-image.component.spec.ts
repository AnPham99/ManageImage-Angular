import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotImageComponent } from './hot-image.component';

describe('HotImageComponent', () => {
  let component: HotImageComponent;
  let fixture: ComponentFixture<HotImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
