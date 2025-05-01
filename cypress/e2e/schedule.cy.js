describe('Music Festival Scheduler', () => {
    it('shows a list of schedules', () => {
      cy.visit('http://localhost:5173')
  
      cy.contains('Friday Festival')
      cy.contains('Saturday Festival')
      cy.contains('Sunday Festival')
    })

    it('shows a schedule details page', () => {
        cy.visit('http://localhost:5173/schedules/1')
        cy.contains('Lineup')

        cy.get('input[placeholder="Search for Band"]').type('Sleep Token')
        cy.wait(500)
        cy.contains('Sleep Token')
    })
})