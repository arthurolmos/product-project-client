import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { app } from '../services/base'

function Copyright () {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export default function FormProduct ({ onSubmitNewProduct }) {
  const classes = useStyles()
  const [tags, setTags] = useState({})
  const [imgUrl, setImgUrl] = useState('')
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  const top100Films = [
    { name: 'The Shawshank Redemption', year: 1994 },
    { name: 'The Godfather', year: 1972 },
    { name: 'The Godfather: Part II', year: 1974 },
    { name: 'The Dark Knight', year: 2008 }
  ]

  const onSubmitHandler = (event) => {
    event.preventDefault()
    onSubmitNewProduct({ name, tags, imgUrl, price, description })
  }

  function onChangeTags (event, value) {
    setTags(value)
  }

  const onChangeFile = (event) => {
    const fileValue = event.target.files[0]
    // envio do arquivo para o firebase
    console.log(fileValue)
    const storageRef = app.storage().ref()
    const ref = storageRef.child(fileValue.name)
    ref.put(fileValue).then(function (snapshot) {
      console.log('Uploaded a blob or file!')
      snapshot.ref.getDownloadURL().then(function (response) {
        setImgUrl(response)
      })
    })
  }

  const onChangeDescription = (event) => {
    setDescription(event.target.value)
    console.log(description)
  }

  const onChangeName = (event) => {
    setName(event.target.value)
  }

  const onChangePrice = (event) => {
    setPrice(event.target.value)
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddShoppingCartIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          New Product
        </Typography>
        <form className={classes.form} onSubmit={onSubmitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete='name'
                name='name'
                variant='outlined'
                required
                fullWidth
                id='name'
                label='Name'
                autoFocus
                onChange={onChangeName}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant='outlined'
                fullWidth
                id='price'
                label='Price'
                name='price'
                autoComplete='price'
                onChange={onChangePrice}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant='outlined'
                fullWidth
                name='description'
                multiline
                label='Description'
                rows={7}
                onChange={onChangeDescription}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                limitTags={3}
                id='multiple-limit-tags'
                options={top100Films}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant='outlined'
                    label='Tags'
                    placeholder='Tags'
                    value={params.name}
                  />
                )}
                onChange={onChangeTags}
              />
            </Grid>

            <Grid item xs={12}>
              <input type='file' onChange={onChangeFile} />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            New Product
          </Button>

        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  )
}
