// Reducer
const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'ALL_POSTS':
      return action.data.blogposts
    case 'ADD_POSTS':
      return state.concat(action.data.blogpost)
    case 'DELETE_POST':
      return state.filter((blogpost) => blogpost.id !== action.data.blogpost.id)
    case 'UPDATE':
      const id = action.data.blogpost.id
      const updatedBlogpost = action.data.blogpost

      return state.map((blogpost) =>
        blogpost.id !== id ? blogpost : updatedBlogpost
      )
    default:
      return state
  }
}

// Actions
export const setAllBlogsRedux = (blogposts) => {
  return { type: 'ALL_POSTS', data: { blogposts } }
}

export const addBlogRedux = (blogpost) => {
  return { type: 'ADD_POSTS', data: { blogpost } }
}

export const updateBlogpostRedux = (blogpost) => {
  return {
    type: 'UPDATE',
    data: { blogpost },
  }
}

export const addBlogLikeRedux = (blogpost) => {
  return {
    type: 'UPDATE',
    data: { blogpost: { ...blogpost, likes: blogpost.likes + 1 } },
  }
}

export const addBlogCommentRedux = (blogpost, comment) => {
  return {
    type: 'UPDATE',
    data: {
      blogpost: { ...blogpost, comments: blogpost.comments.concat(comment) },
    },
  }
}

export const deleteBlogRedux = (blogpost) => {
  return { type: 'DELETE_POST', data: { blogpost } }
}

// Reducer export
export default blogReducer
