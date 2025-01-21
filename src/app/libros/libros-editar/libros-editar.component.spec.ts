import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrosEditarComponent } from './libros-editar.component';

describe('LibrosEditarComponent', () => {
  let component: LibrosEditarComponent;
  let fixture: ComponentFixture<LibrosEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LibrosEditarComponent]
    });
    fixture = TestBed.createComponent(LibrosEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
