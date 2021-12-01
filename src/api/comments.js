export const getComments = async (idPost, cb) => {
  try {
    const data = await fetch(`https://jsonplaceholder.typicode.com/posts/${idPost}/comments`)
    const comments = await data.json()
    cb(comments)
    return comments;
  } catch (error) {
    return error
  }
}
