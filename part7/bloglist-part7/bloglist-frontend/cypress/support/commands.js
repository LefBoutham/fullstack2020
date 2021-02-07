// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('createBlogpost', (title, author, url) => {
  cy.get('#add-blog-post').click()
  cy.get('#title').type(title)
  cy.get('#author').type(author)
  cy.get('#url').type(url)
  cy.get('#publish-blog-post').click()
})

Cypress.Commands.add('createBlogpostByRequest', (title, author, url, likes) => {
  const user = JSON.parse(localStorage.getItem('loggedBlogUser'))
  const token = user.token
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    auth: {
      username: 'admin',
      password: 'password',
      bearer: token,
    },
    body: {
      title: title,
      author: author,
      url: url,
      likes: likes,
    },
  })
})
