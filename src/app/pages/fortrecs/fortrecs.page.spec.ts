import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FortrecsPage } from './fortrecs.page';

describe('FortrecsPage', () => {
  let component: FortrecsPage;
  let fixture: ComponentFixture<FortrecsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FortrecsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
