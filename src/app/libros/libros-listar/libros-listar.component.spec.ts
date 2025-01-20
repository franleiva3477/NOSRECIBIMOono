import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrosListarComponent } from './libros-listar.component';

describe('LibrosListarComponent', () => {
  let component: LibrosListarComponent;
  let fixture: ComponentFixture<LibrosListarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LibrosListarComponent]
    });
    fixture = TestBed.createComponent(LibrosListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
