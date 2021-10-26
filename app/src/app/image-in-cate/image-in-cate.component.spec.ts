import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageInCateComponent } from './image-in-cate.component';

describe('ImageInCateComponent', () => {
  let component: ImageInCateComponent;
  let fixture: ComponentFixture<ImageInCateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageInCateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageInCateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
