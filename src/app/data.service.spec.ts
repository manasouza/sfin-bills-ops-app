import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(DataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an empty list when the recent bills request fails', () => {
    const callback = jasmine.createSpy('callback');
    const errorCallback = jasmine.createSpy('errorCallback');

    service.getRecentBills(callback, errorCallback);

    const request = httpTestingController.expectOne('http://localhost:3000/categories/unmapped');
    request.flush('Server error', { status: 500, statusText: 'Internal Server Error' });

    expect(callback).toHaveBeenCalledWith([]);
    expect(errorCallback).toHaveBeenCalled();
  });
});
