import { getPosts } from './posts'
import { getUsers } from './users'

export const getUsersWithPosts = async (cb) => {
  const posts = await getPosts()
  const users = await getUsers()
  if (!posts || !users) {
    return []
  }
  const ids = posts.reduce((acc, post) => {
    const { userId } = post
    return {
      ...acc,
      [userId]: [
        ...(acc[userId] || []),
        post
      ]
    }
  }, {})
  const usersWithPosts = users.map(user => ({ ...user, posts: ids[user.id] }))
  cb(usersWithPosts)
  return usersWithPosts
}
