import { Button, TextField } from '@mui/material';
import './Login.scss';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAuth, selectIsAuth } from '../../redux/slices/auth';

import { useNavigate } from 'react-router-dom';
import { Context } from '../../Context/Context';
import { useContext } from 'react';

function Login() {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { setValue } = useContext(Context)

  const {
    register,
    handleSubmit,
    // setError,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      email: 'abdulloh50007@gmail.com',
      password: '@abdulloh16',
      // mode: 'all',
    }
  })

  const onSubmit = async (values) => {
    dispatch(fetchAuth(values))
    const data = await dispatch(fetchAuth(values))

    if(!data.payload) {
      return alert('You are not authorized to');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }
  if (isAuth) {
    setValue('/')
    return navigate('/')
  }

  return (
    <div className='login'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className='inp'
          type="email"
          label="E-mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Укажите почту' })} />
        <TextField
          className='inp'
          type="text"
          label="Password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Укажите пароль' })} />
        <Button disabled={!isValid} type='submit' variant='contained' color='primary'>
          Submit
        </Button>
      </form>
    </div>
  )
}

export default Login