export const getUsers = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const users = await response.json()
    return users
  } catch (error) {
    return error
  }
}
