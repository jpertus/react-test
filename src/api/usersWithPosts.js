import { getPosts } from './posts'
import { getUsers } from './users'

export const getUsersWithPosts = async () => {
  const [posts, users] = await Promise.all([ getPosts(), getUsers() ])
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
  return users.map(user => ({ ...user, posts: ids[user.id] }))
}
