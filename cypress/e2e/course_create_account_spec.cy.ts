describe('Course Create Account Spec', () => {
  it('passes', () => {
    cy.visit('https://kurs-inf02.learnpool.pl:3000/app/stworzkonto');

    cy.get('a[href*="about"]').click();
  });
});
