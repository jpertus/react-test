export const getPosts = async () => {
  try {
    const data = await fetch('https://jsonplaceholder.typicode.com/posts')
    return data.json()
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
    return postResponse.json()
  } catch (error) {
    return error
  }
}
