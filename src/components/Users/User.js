import { useMemo, useState } from 'react'
import { Box, CardActions, List, Grid, Card, CardHeader, Avatar, IconButton } from '@mui/material'
import { red } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import AddPostModal from './Post/AddPostModal'
import Post from './Post'

const User = ({ user }) => {
  const { posts } = user

  const [open, setOpen] = useState(false)

  const render = useMemo(() => (
    <Grid item>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {user.name[0]}
            </Avatar>
          }
          title={user.name}
          subheader={user.email}
        />
        <Box
          sx={{ width: '100%', height: 300, maxWidth: 360, bgcolor: 'background.paper', overflow: 'scroll', overflowX: 'hidden' }}
        >
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            aria-label="contacts"
          >
            {posts.map(post => <Post key={`post-${post.id}`} post={post} />)}
          </List>
        </Box>
        <CardActions disableSpacing>
          <IconButton
            aria-label="show more"
            sx={{ marginLeft: 'auto' }}
            onClick={() => setOpen(true)}
          >
            <AddIcon />
          </IconButton>
        </CardActions>
        <AddPostModal
          open={open}
          onClose={() => setOpen(false)}
          onSubmit={() => setOpen(false)}
          user={user}
        />
      </Card>
    </Grid>
  ), [open, user.id])

  return <>{render}</>
}

export default User
