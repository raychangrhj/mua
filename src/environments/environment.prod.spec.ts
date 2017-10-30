import { environment } from './environment.prod';

describe('Prod Environment', () => {
  let testObject;
  beforeEach(() => {
    testObject = environment;
  });

  it('should be an object with production set to true', () => {
    expect(environment.production).toEqual(true);
  });
});
