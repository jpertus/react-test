export const getPosts = async () => {
  try {
    const data = await fetch('https://jsonplaceholder.typicode.com/posts')
    const posts = await data.json()
    return posts
  } catch (error) {
    return error
  }
}

export const postPost = async (data) => {
  try {
    const postResponse = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    const post = await postResponse.json()
    return post
  } catch (error) {
    return error
  }
}
