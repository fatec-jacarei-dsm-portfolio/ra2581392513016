import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultCard } from './default-card';

describe('DefaultCard', () => {
  let component: DefaultCard;
  let fixture: ComponentFixture<DefaultCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
