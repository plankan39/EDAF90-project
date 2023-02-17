import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspirationProfileComponent } from './inspiration-profile.component';

describe('InspirationProfileComponent', () => {
  let component: InspirationProfileComponent;
  let fixture: ComponentFixture<InspirationProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspirationProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspirationProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
