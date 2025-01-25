import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorialesCargarComponent } from './editoriales-cargar.component';

describe('EditorialesCargarComponent', () => {
  let component: EditorialesCargarComponent;
  let fixture: ComponentFixture<EditorialesCargarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditorialesCargarComponent]
    });
    fixture = TestBed.createComponent(EditorialesCargarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
