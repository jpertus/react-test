export const getComments = async (idPost, cb) => {
  try {
    const data = await fetch(`https://jsonplaceholder.typicode.com/posts/${idPost}/comments`)
    return data.json()
  } catch (error) {
    return error
  }
}
