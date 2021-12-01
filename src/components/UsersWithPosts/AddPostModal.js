import { useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Alert, Dialog, TextField, Grid, Box, Button } from '@mui/material'
import { postPost } from '../../api/posts'

const postSchema = Yup.object({
  title: Yup.string().min(1, 'Minimum 1 caractère').max(255, 'Maximum 5 caractères').required('Le titre est obligatoire'), 
  body: Yup.string().min(1, 'Minimum 1 caractère').required('Le texte est obligatoire')
})

const AddPostModal = ({ onClose, onSubmit, open, user }) => {
  const [errorMsg, setErrorMsg] = useState('')

  const formik = useFormik({
    initialValues: {
      title: '',
      body: ''
    },
    validationSchema: postSchema,
    enableReinitialize: true,
    onSubmit: async form => {
      try {
        const { title, body } = form
        const dataForm = {
          title,
          body,
          userId: user.id
        }
        await postPost(dataForm)
        onSubmit()
      } catch (error) {
        setErrorMsg(error)
      }
      
    }
  })

  return (
    <Dialog open={open} onClose={onClose} sx={{ '& .MuiDialog-paper': { width: '664px', borderRadius: '12px', padding: '32px' } }}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container justifyContent="space-between" sx={{ marginBottom: '16px' }}>
          <Grid item>
            <Box component="span" sx={{ fontSize: '24px', fontWeight: '400', color: 'gray' }}>
              Créer un poste pour {user.name}
            </Box>
          </Grid>
        </Grid>
        <Grid container sx={{ marginBottom: '16px' }}>
          <Grid item xs={12}>
            <span style={{ fontWeight: '600' }}>Titre</span>
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              variant="outlined"
              id="title"
              label="titre"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
            {
              formik.touched.title && formik.errors.title && <Alert severity="error">{formik.errors.title}</Alert>
            }
          </Grid>
        </Grid>
        <Grid container sx={{ marginBottom: '16px' }}>
          <Grid item xs={12}>
            <span style={{ fontWeight: '600' }}>Texte</span>
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              variant="outlined"
              multiline
              id="body"
              label="Texte"
              onChange={formik.handleChange}
              value={formik.values.body}
            />
            {
              formik.touched.body && formik.errors.body && <Alert severity="error">{formik.errors.body}</Alert>
            }
          </Grid>
        </Grid>
        <Grid container>
          <Button type="submit" sx={{
            color: 'white', background: 'teal', border: 'none', borderRadius: '8.35px',
            '&:hover': {
              backgroundColor: 'teal'
            }
        }} fullWidth>Valider</Button>
        </Grid>
      </form>
    </Dialog>
  )
}

export default AddPostModal
