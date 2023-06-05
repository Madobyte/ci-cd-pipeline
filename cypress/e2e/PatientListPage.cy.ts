describe('Patient List Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
    cy.contains('Patientor')
    cy.contains('John McClane').click()
  })

  it('Contains a patient', () => {
    cy.contains('John McClane')
  })

  it('Goes to patient page', () => {
    cy.contains('SSN: 090786-122X')
  })

  describe('Add new entry modal', () => {
    beforeEach(() => {
      cy.contains('Add entry').click()
    })

    it('Can add new entry', () => {
      cy.contains('Add new entry')
      cy.contains('Discharge')
    })

    it('Occupational healthcare', () => {
      cy.contains('Occupational Healthcare').click()
      cy.contains('Sick leave')
    })

    it('Health check', () => {
      cy.contains('Health Check').click()
      cy.contains('Health Check Rating')
    })
  })
})
