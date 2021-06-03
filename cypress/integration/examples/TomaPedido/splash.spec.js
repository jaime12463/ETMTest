describe('SplashTest',() => {
    it('Acceso a Pagina', () => {
      cy.visit("/");
      cy.on('uncaught:exception', (err, runnable) => {
        console.log(err);
        return false;
      })
    })
    // it('Titulo',()=>{
    //     cy.get('.MuiTypography-root').contains('Bienvenido')
    // })
    // it('Login Box',()=>{
    //     cy.get('img').click();
    // })
    // it('Ingreso de Cliente',()=>{
    //     cy.get('.MuiInputBase-input').type('120104325{enter}');
    // })
    // it('Buscar Producto',() => {
    //     cy.get('.makeStyles-paper-13 > .MuiGrid-container > .MuiGrid-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').type('186')
    // })
    // it('Seleccion de Producto en lista',()=>{
    //     cy.get('.MuiTableBody-root > .MuiTableRow-root > :nth-child(1)').click()
    // })
    // it('Agrego Unidades',()=>{
    //     cy.get(':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').type('100{enter}')
    // })
    // it('Buscar Producto2',() => {
    //     cy.get('.makeStyles-paper-13 > .MuiGrid-container > .MuiGrid-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').clear()
    //     cy.get('.makeStyles-paper-13 > .MuiGrid-container > .MuiGrid-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').type('975{enter}')
    // })
    // it('Seleccion de Producto en lista2',()=>{
    //     cy.get('.MuiTableBody-root > .MuiTableRow-root > :nth-child(1)').click()
    // })
    // it('Agrego Unidades2',()=>{
    //     cy.get(':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').type('1000{enter}')
    // })
    // it('Click on Ver Detalle',()=>{
    //     cy.get('a > .MuiButtonBase-root > .MuiButton-label').click()
    // })
})