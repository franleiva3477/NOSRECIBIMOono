import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamosLibrosComponent } from './prestamos-libros.component';

describe('PrestamosLibrosComponent', () => {
  let component: PrestamosLibrosComponent;
  let fixture: ComponentFixture<PrestamosLibrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrestamosLibrosComponent]
    });
    fixture = TestBed.createComponent(PrestamosLibrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
