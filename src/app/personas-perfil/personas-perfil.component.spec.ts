import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasPerfilComponent } from './personas-perfil.component';

describe('PersonasPerfilComponent', () => {
  let component: PersonasPerfilComponent;
  let fixture: ComponentFixture<PersonasPerfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonasPerfilComponent]
    });
    fixture = TestBed.createComponent(PersonasPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
