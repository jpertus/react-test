import { useState, useEffect } from 'react'
import { Box, Typography, Modal } from '@mui/material';
import { getComments } from '../../../api/comments'

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

export default PostModal
