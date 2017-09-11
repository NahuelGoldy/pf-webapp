import { SbAdminCliUpdatePage } from '../page-objects/app.po';

describe('sb-admin-cli-update App', () => {
  let page: SbAdminCliUpdatePage;

  beforeEach(() => {
    page = new SbAdminCliUpdatePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
