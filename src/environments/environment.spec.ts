import { environment } from './environment';

describe('Non Prod Environment', () => {
  let testObject;
  beforeEach(() => {
    testObject = environment;
  });

  it('should be an object with production set to false', () => {
    expect(environment.production).toEqual(false);
  });
});
