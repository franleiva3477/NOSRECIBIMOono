import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrosCargarComponent } from './libros-cargar.component';

describe('LibrosCargarComponent', () => {
  let component: LibrosCargarComponent;
  let fixture: ComponentFixture<LibrosCargarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LibrosCargarComponent]
    });
    fixture = TestBed.createComponent(LibrosCargarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
