import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipesDemoComponentComponent } from './pipes-demo-component.component';

describe('PipesDemoComponentComponent', () => {
  let component: PipesDemoComponentComponent;
  let fixture: ComponentFixture<PipesDemoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipesDemoComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PipesDemoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
