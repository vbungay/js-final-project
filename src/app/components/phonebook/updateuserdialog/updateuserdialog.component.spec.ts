import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateuserdialogComponent } from './updateuserdialog.component';

describe('UpdateuserdialogComponent', () => {
  let component: UpdateuserdialogComponent;
  let fixture: ComponentFixture<UpdateuserdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateuserdialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateuserdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
