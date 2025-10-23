import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashEstudiantesComponent } from './dash-estudiantes.component';

describe('DashEstudiantesComponent', () => {
  let component: DashEstudiantesComponent;
  let fixture: ComponentFixture<DashEstudiantesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashEstudiantesComponent]
    });
    fixture = TestBed.createComponent(DashEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
