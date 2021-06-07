describe('SplashTest', () => {
  beforeEach(() => {
    cy.visit("/");
    cy.on('uncaught:exception', (err, runnable) => {
      console.log(err);
      return false;
    })
  });
  it('Ingreso de Producto', () => {
    cy.fixture('pagesElements').then((element) => {
      cy.get(element.splash.name).should('contain', element.splash.value);
      cy.get(element.splash.logoBox).click();
      cy.get(element.client.code).type('120104325{enter}');
      cy.get(element.client.inputSearch).type('186');
      cy.get(element.client.ProductSelect).click();
      cy.get(element.client.addUnits).type('100{enter}')
    })
  })
})