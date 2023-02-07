import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    service = new MessageService();
    TestBed.configureTestingModule({
      declarations: [MessageService]
    })
    .compileComponents();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
