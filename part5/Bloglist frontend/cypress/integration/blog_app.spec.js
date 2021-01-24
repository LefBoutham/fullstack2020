describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'Chill Smith',
      username: 'admin',
      password: 'password',
    }

    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('admin')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('Chill Smith logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('admin')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3001/api/login', {
        username: 'admin',
        password: 'password',
      }).then((response) => {
        localStorage.setItem('loggedBlogUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function () {
      cy.get('#add-blog-post').click()
      cy.get('#title').type('Test Title')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('Test URL')
      cy.get('#publish-blog-post').click()
      cy.contains('A new blog Test Title created by Test Author added')
      cy.get('#blog-list').contains('Test Title Test Author')
    })

    it('A blog can be liked', function () {
      cy.createBlogpost('Test Title', 'Test Author', 'Test URL')
      cy.get('#blog-list')
        .contains('Test Title Test Author')
        .get('.showBlogInfo')
        .click()
      cy.get('#likeButton').click()
      cy.contains('Likes: 1')
    })

    it('A blog can be deleted', function () {
      cy.createBlogpostByRequest('Test Title', 'Test Author', 'Test URL', 0)
      cy.visit('http://localhost:3000/')
      cy.get('#blog-list')
        .contains('Test Title Test Author')
        .get('.showBlogInfo')
        .click()
      cy.get('#delete-button').click()
      cy.contains('Blogpost deleted')
    })

    it('Blogs are ordered according to likes', function () {
      cy.createBlogpostByRequest(
        'Test Title 1',
        'Test Author 1',
        'Test URL 1',
        32
      )
      cy.createBlogpostByRequest(
        'Test Title 2',
        'Test Author 2',
        'Test URL 2',
        18
      )
      cy.createBlogpostByRequest(
        'Test Title 3',
        'Test Author 3',
        'Test URL 3',
        56
      )
      cy.visit('http://localhost:3000/')
      cy.get('.showBlogInfo').each(($blogPost) => {
        cy.wrap($blogPost).click()
      })
      cy.get('.blogpost').then((blogpost) => {
        cy.wrap(blogpost[0]).contains('Likes: 56')
        cy.wrap(blogpost[1]).contains('Likes: 32')
        cy.wrap(blogpost[2]).contains('Likes: 18')
      })
    })
  })
})
