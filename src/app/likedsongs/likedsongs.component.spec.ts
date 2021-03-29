import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedsongsComponent } from './likedsongs.component';

describe('LikedsongsComponent', () => {
  let component: LikedsongsComponent;
  let fixture: ComponentFixture<LikedsongsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikedsongsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikedsongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
