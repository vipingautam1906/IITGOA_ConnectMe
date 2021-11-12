import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateuserpostComponent } from './updateuserpost.component';

describe('UpdateuserpostComponent', () => {
  let component: UpdateuserpostComponent;
  let fixture: ComponentFixture<UpdateuserpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateuserpostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateuserpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
