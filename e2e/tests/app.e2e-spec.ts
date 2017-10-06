import { LandingPage } from '../page-objects/app.po';

describe('Donde estaciono? WEB - Landing page', () => {
  let page: LandingPage;

  beforeEach(() => {
    page = new LandingPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Donde estaciono? - WEB');
  });
});
