import { MortgagePage } from './app.po';

describe('mortgage App', () => {
  let page: MortgagePage;

  beforeEach(() => {
    page = new MortgagePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
