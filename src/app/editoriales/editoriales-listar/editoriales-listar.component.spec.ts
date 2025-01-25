import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorialesListarComponent } from './editoriales-listar.component';

describe('EditorialesListarComponent', () => {
  let component: EditorialesListarComponent;
  let fixture: ComponentFixture<EditorialesListarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditorialesListarComponent]
    });
    fixture = TestBed.createComponent(EditorialesListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
