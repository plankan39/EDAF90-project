import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsFormComponent } from './ingredients-form.component';

describe('IngredientsFormComponent', () => {
  let component: IngredientsFormComponent;
  let fixture: ComponentFixture<IngredientsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngredientsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
