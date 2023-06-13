/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SeancesComponent } from './Seances.component';

describe('SeancesComponent', () => {
  let component: SeancesComponent;
  let fixture: ComponentFixture<SeancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
