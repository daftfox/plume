import { getTitle } from '../support/app.po';

describe('forms-demo', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Function helper example, see `../support/app.po.ts` file
    getTitle().contains(/Plume forms/);
  });
});
