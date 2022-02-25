import { TestBed } from '@angular/core/testing';

import { LoadUserResolver } from './load-user.resolver';

describe('LoadUserResolver', () => {
  let resolver: LoadUserResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(LoadUserResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
