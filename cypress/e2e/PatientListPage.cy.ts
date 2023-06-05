describe('Patient List Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
    cy.contains('Patientor')
  })

  it('Conatains patientor', () => {
    cy.contains('Patientor')
  })

  it('Contains home', () => {
    cy.contains('Home')
  })

  it('Contains Add New Patient', () => {
    cy.contains('Add New Patient')
  })

  it('Opens modal', () => {
    cy.contains('Add New Patient').click()
    cy.contains('Gender')
  })
})
