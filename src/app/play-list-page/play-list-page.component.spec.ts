import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayListPageComponent } from './play-list-page.component';

describe('PlayListPageComponent', () => {
  let component: PlayListPageComponent;
  let fixture: ComponentFixture<PlayListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
