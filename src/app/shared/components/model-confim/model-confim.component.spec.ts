import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelConfimComponent } from './model-confim.component';

describe('ModelConfimComponent', () => {
  let component: ModelConfimComponent;
  let fixture: ComponentFixture<ModelConfimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelConfimComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelConfimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
