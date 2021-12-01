import { useState } from 'react'
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import PostModal from './PostModal'

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

export default Post
