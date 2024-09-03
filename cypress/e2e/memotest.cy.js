describe('Memotest tests', () => {
  beforeEach('Navigates to the website', () => {
    cy.visit('http://127.0.0.1:8080')
  })

  it('Play button should exist', () => {
    cy.get('#play-button').should('exist')
  })

  it('should start the game when the play button is clicked', () => {
    cy.get('#play-button').click()
    cy.get('.emoji').should('have.class', 'opacity-0')
  })

  it('should display the clicked emoji', () => {
    cy.get('#play-button').click()
    cy.get('.emoji').first().click()
    cy.get('.emoji').first().click().should('have.class', 'opacity-100')
  })

  it('should increase the attempt counter', () => {
    cy.get('#play-button').click()
    cy.get('.emoji').eq(0).click()
    cy.get('.emoji').eq(1).click()
    cy.get('#attempts-display').should('contain.text', 'Attempts: 1')
  })

  it('should match two identical emojis', () => {
    cy.get('#play-button').click()
    cy.get('.emoji').then(($emojis) => {
      const firstEmoji = $emojis[0]
      const secondEmoji = [...$emojis].find(emoji => emoji.textContent === firstEmoji.textContent && emoji !== firstEmoji)


      if (secondEmoji) {
        cy.wrap(firstEmoji).click();
        cy.wrap(secondEmoji).click();

        cy.wrap(firstEmoji).should('have.class', 'opacity-100');
        cy.wrap(secondEmoji).should('have.class', 'opacity-100');
      }
    })
  })

  it('should win if matches all emojis', () => {
    cy.get('#play-button').click()

    cy.get('.emoji').then(($emojis) => {
      let i = 0;
      let matches = 0;

      while (matches < 4) {
        const firstEmoji = $emojis[i]
        const secondEmoji = [...$emojis].find(emoji => emoji.textContent === firstEmoji.textContent && emoji !== firstEmoji)


        if (secondEmoji) {
          cy.wrap(firstEmoji).click();
          cy.wrap(secondEmoji).click();

          cy.wrap(firstEmoji).should('have.class', 'opacity-100');
          cy.wrap(secondEmoji).should('have.class', 'opacity-100');

          i++;
          matches++;
        }
      }

      if (matches === 4) {
        cy.get('#play-button').should('contain.text', 'Play again!').and('not.be.disabled')
      }
    })
  })
})