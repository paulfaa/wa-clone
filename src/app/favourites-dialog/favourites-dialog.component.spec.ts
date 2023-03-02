import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesDialogComponent } from './favourites-dialog.component';

describe('FavouritesDialogComponent', () => {
  let component: FavouritesDialogComponent;
  let fixture: ComponentFixture<FavouritesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouritesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouritesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
