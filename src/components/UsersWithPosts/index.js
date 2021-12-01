import './index.css'
import { useEffect, useState } from 'react'
import { Container, Grid, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { getUsersWithPosts } from '../../api/usersWithPosts'
import { getComments } from '../../api/comments'
import AddPostModal from './AddPostModal'

const stylePostModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxHeight: 500,
  overflow: 'scroll',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const PostModal = ({ open, onClose, post }) => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    if (open) {
      getComments(post.id, setComments)
    }
  }, [post.id, open])

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={stylePostModal}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            {post.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {post.body}
          </Typography>
          <br />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Comments :
          </Typography>
          {
            comments.map(comment => (
              <div key={`comment-${comment.id}`}>
                <Typography id="modal-modal-title" variant="h5">
                  {comment.name}
                </Typography>
                <Typography>
                  {comment.body}
                </Typography>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {comment.email}
                </Typography>
                <hr />
              </div>
            ))
          }
        </Box>
      </Modal>
    </div>
  )
}

const Post = ({ post }) => {
  const [open, setOpen] = useState(false)
  
  return (
    <>
      <ListItem onClick={() => setOpen(true)} disablePadding>
        <ListItemButton>
          <ListItemText inset primary={post.title} />
        </ListItemButton>
        
      </ListItem>
      <PostModal open={open} onClose={() => setOpen(false)} post={post} />
    </>
  )
}

const UserWithPost = ({ user }) => {
  const { posts } = user

  const [open, setOpen] = useState(false)

  return (
    <Grid item>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {user.name[0]}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
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
  )
}

const UsersWithPosts =  () => {
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
    <Container maxWidth="lg">
      <Grid justifyContent="space-between" sx={{ marginTop: '32px', marginBottom: '32px' }}>
        <TextField sx={{ mr: 4 }} InputProps={{ className: 'input-white' }} variant="outlined" label="nom" onChange={e => setNameFilter(e.target.value)} value={nameFilter} />
        <TextField InputProps={{ className: 'input-white' }} variant="outlined" label="email" onChange={e => setEmailFilter(e.target.value)} value={emailFilter} />
      </Grid>
      <Grid container spacing={2} justifyContent="space-between">
        {usersFiltered.map(user => (
          <UserWithPost key={`user-${user.id}`} user={user} />
        ))}
      </Grid>
    </Container>
  )
}

export default UsersWithPosts
