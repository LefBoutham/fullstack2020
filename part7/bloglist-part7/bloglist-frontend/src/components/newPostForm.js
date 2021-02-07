import React, { useState } from 'react'

const NewPostForm = ({ createBlogPost }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const submitBlogPost = async (event) => {
    event.preventDefault()
    createBlogPost({
      title: title,
      author: author,
      url: url,
    })

    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div id="blog-post-form" className="formDiv">
      <form onSubmit={submitBlogPost}>
        Title:{' '}
        <input
          id="title"
          type="text"
          value={title}
          name="Title"
          onChange={handleTitleChange}
        />{' '}
        <br />
        Author:{' '}
        <input
          id="author"
          type="text"
          value={author}
          name="Author"
          onChange={handleAuthorChange}
        />
        <br />
        Url:{' '}
        <input
          id="url"
          type="text"
          value={url}
          name="Url"
          onChange={handleUrlChange}
        />
        <br />
        <button id="publish-blog-post" type="submit">
          Create
        </button>
      </form>
    </div>
  )
}

export default NewPostForm
