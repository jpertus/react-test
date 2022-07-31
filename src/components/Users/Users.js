import './Users.css'
import { useState, useMemo } from 'react'
import { useAsync } from 'react-use'
import { Container, Grid, TextField } from '@mui/material'
import { getUsersWithPosts } from '../../api/usersWithPosts'
import User from './User'

const Users =  () => {
  const [nameFilter, setNameFilter] = useState()
  const [emailFilter, setEmailFilter] = useState()

  const fetchState = useAsync(async () => getUsersWithPosts(), [])

  const usersFiltered = useMemo(() => {
    if (fetchState.loading) return []
    return !Array.isArray(fetchState.value) ? [] : fetchState.value.filter(user => (!nameFilter || user.name.indexOf(nameFilter) !== -1) && (!emailFilter || user.name.indexOf(emailFilter) !== -1))
  }, [fetchState, nameFilter, emailFilter])

  return (
    <Container sx={{ mb: 2 }}>
      <Grid justifyContent="space-between" sx={{ marginTop: '32px', marginBottom: '32px' }}>
        <TextField sx={{ m: 2 }} InputProps={{ className: 'input-white' }} variant="outlined" label="nom" onChange={e => setNameFilter(e.target.value)} value={nameFilter} />
        <TextField sx={{ m: 2 }} InputProps={{ className: 'input-white' }} variant="outlined" label="email" onChange={e => setEmailFilter(e.target.value)} value={emailFilter} />
      </Grid>
      <Grid alignItems="baseline" sx={{ flexGrow: 1 }} container spacing={6} justifyContent="start">
        {fetchState.loading && (
          <div style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
<h3 style={{
            color: 'white',
            textAlign: 'center'
          }}>Chargement ...</h3>
          </div>
          
        )}
        {!fetchState.loading && usersFiltered.map(user => (
          <User key={`user-${user.id}`} user={user} />
        ))}
      </Grid>
    </Container>
  )
}

export default Users
