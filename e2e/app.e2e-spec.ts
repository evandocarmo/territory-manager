import { TerritoryPage } from './app.po';

describe('territory App', () => {
  let page: TerritoryPage;

  beforeEach(() => {
    page = new TerritoryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
