import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorialesEditarComponent } from './editoriales-editar.component';

describe('EditorialesEditarComponent', () => {
  let component: EditorialesEditarComponent;
  let fixture: ComponentFixture<EditorialesEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditorialesEditarComponent]
    });
    fixture = TestBed.createComponent(EditorialesEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
