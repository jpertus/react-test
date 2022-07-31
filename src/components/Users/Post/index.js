import { useMemo, useState } from 'react'
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import PostModal from './PostModal'

const Post = ({ post }) => {
  const [open, setOpen] = useState(false)

  const render = useMemo(() => (
    <>
      <ListItem onClick={() => setOpen(true)} disablePadding>
        <ListItemButton>
          <ListItemText inset primary={post.title} />
        </ListItemButton>
        
      </ListItem>
      <PostModal open={open} onClose={() => setOpen(false)} post={post} />
    </>
  ), [open, post.id])
  
  return (
    <>{render}</>
  )
}

export default Post
