import './Users.css'
import { useState, useEffect } from 'react'
import { Container, Grid, TextField } from '@mui/material'
import { getUsersWithPosts } from '../../api/usersWithPosts'
import User from './User'

const Users =  () => {
  const [users, setUsers] = useState([])
  const [nameFilter, setNameFilter] = useState('')
  const [emailFilter, setEmailFilter] = useState('')

  useEffect(() => {
    getUsersWithPosts(setUsers)
  }, [])

  let usersFiltered = [...users]

  if (nameFilter) {
    usersFiltered = usersFiltered.filter(user => user.name.indexOf(nameFilter) !== -1)
  }

  if (emailFilter) {
    usersFiltered = usersFiltered.filter(user => user.email.indexOf(emailFilter) !== -1)
  }

  return (
    <Container>
      <Grid justifyContent="space-between" sx={{ marginTop: '32px', marginBottom: '32px' }}>
        <TextField sx={{ m: 2 }} InputProps={{ className: 'input-white' }} variant="outlined" label="nom" onChange={e => setNameFilter(e.target.value)} value={nameFilter} />
        <TextField sx={{ m: 2 }} InputProps={{ className: 'input-white' }} variant="outlined" label="email" onChange={e => setEmailFilter(e.target.value)} value={emailFilter} />
      </Grid>
      <Grid alignItems="baseline" sx={{ flexGrow: 1 }} container spacing={6} justifyContent="center">
        {usersFiltered.map(user => (
          <User key={`user-${user.id}`} user={user} />
        ))}
      </Grid>
    </Container>
  )
}

export default Users
