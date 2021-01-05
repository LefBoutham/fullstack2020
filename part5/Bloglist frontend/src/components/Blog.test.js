import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'
import NewPostForm from './newPostForm'

test('renders content', () => {
  const blogPost = {
    title: 'Testing Title',
    author: 'Testing Author',
    url: 'Testing URL',
    user: [
      {
        username: 'admin3',
        name: 'Alex',
        id: '5feb3b7a5b37a3287b4dc996',
      },
    ],
  }

  const user = {
    name: 'Alex',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMyIsImlkIjoiNWZlYjNiN2E1YjM3YTMyODdiNGRjOTk2IiwiaWF0IjoxNjA5NDIwNjI3fQ.kT5xYS5kfUr-BQT-L4GJKmcSX-0eMUQTpsm4OQURTjI',
    username: 'admin3',
  }

  const component = render(<Blog blog={blogPost} user={user} />)

  expect(
    component.container.querySelector('.blogpost-hidden')
  ).toHaveTextContent('Testing Title Testing Author')
})

test('clicking the button shows more info about blog', () => {
  const blogPost = {
    title: 'Testing Title',
    author: 'Testing Author',
    url: 'Testing URL',
    user: [
      {
        username: 'admin3',
        name: 'Alex',
        id: '5feb3b7a5b37a3287b4dc996',
      },
    ],
  }

  const user = {
    name: 'Alex',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMyIsImlkIjoiNWZlYjNiN2E1YjM3YTMyODdiNGRjOTk2IiwiaWF0IjoxNjA5NDIwNjI3fQ.kT5xYS5kfUr-BQT-L4GJKmcSX-0eMUQTpsm4OQURTjI',
    username: 'admin3',
  }

  const component = render(<Blog blog={blogPost} user={user} />)

  const button = component.container.querySelector('button')

  fireEvent.click(button)

  expect(
    component.container.querySelector('.blogpost-visible')
  ).toHaveTextContent('Testing URL Likes:')
})

test('clicking the "like" button twice produces 2 click events', () => {
  const blogPost = {
    title: 'Testing Title',
    author: 'Testing Author',
    url: 'Testing URL',
    user: [
      {
        username: 'admin3',
        name: 'Alex',
        id: '5feb3b7a5b37a3287b4dc996',
      },
    ],
  }

  const user = {
    name: 'Alex',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMyIsImlkIjoiNWZlYjNiN2E1YjM3YTMyODdiNGRjOTk2IiwiaWF0IjoxNjA5NDIwNjI3fQ.kT5xYS5kfUr-BQT-L4GJKmcSX-0eMUQTpsm4OQURTjI',
    username: 'admin3',
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blogPost} user={user} testLikeButton={mockHandler} />
  )

  const button = component.container.querySelector('#likeButton')

  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('<NewPostForm /> updates parent state and calls onSubmit', () => {
  const createBlogPost = jest.fn()
  const component = render(<NewPostForm createBlogPost={createBlogPost} />)

  const form = component.container.querySelector('form')

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')

  fireEvent.change(title, {
    target: { value: 'Testing title' },
  })
  fireEvent.change(author, {
    target: { value: 'Testing author' },
  })
  fireEvent.change(url, {
    target: { value: 'Testing URL' },
  })
  fireEvent.submit(form)

  expect(createBlogPost.mock.calls).toHaveLength(1)
  console.log(createBlogPost.mock.calls[0][0])
  expect(createBlogPost.mock.calls[0][0].title).toBe('Testing title')
  expect(createBlogPost.mock.calls[0][0].author).toBe('Testing author')
  expect(createBlogPost.mock.calls[0][0].url).toBe('Testing URL')
})
