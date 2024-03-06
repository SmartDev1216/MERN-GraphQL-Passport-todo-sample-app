import React from 'react'
import { useNavigate } from 'react-router-dom';
import {Formik,Form,Field,ErrorMessage} from 'formik';
import * as Yup from 'yup'
import { useMutation } from '@apollo/client';
import { SIGN_UP } from './../graphql/queries';
import setToken from './../utils/token';
import { useAuth } from '../utils/authContext';

const SignUpSchema = Yup.object().shape({
  username:Yup.string().required('Username is required'),
  email:Yup.string().email('Invalid email').required('Email is required'),
  password:Yup.string()
              .min(6,'Password must be at least 6 charaters')
              .required('Password is required')
})

const SignUp = () => {
  const [signUp] = useMutation(SIGN_UP);
  const {setAuth} = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (values,{setSubmitting}) => {
    try {
      const res = await signUp({variables:values})
      console.log(res.data.signUp)
      if(res.data&&res.data.signUp.token){
        setToken(res)
      }
      if(res.data&&res.data.signUp.user){
        setAuth(res.data.signUp.user)
      }
      alert('success register')
      navigate('/')
    } catch (error) {
      alert(error.message)
    }

    setSubmitting(false)
  }

  return (
    <div className="max-w-md mx-auto mt-[100px]">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <Formik initialValues={{ username: '', email: '', password: '' }} validationSchema={SignUpSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="username" className="block mb-1">Username</label>
              <Field type="text" name="username" id="username" className="w-full p-2 border rounded" />
              <ErrorMessage name="username" component="div" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1">Email</label>
              <Field type="email" name="email" id="email" className="w-full p-2 border rounded" />
              <ErrorMessage name="email" component="div" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-1">Password</label>
              <Field type="password" name="password" id="password" className="w-full p-2 border rounded" />
              <ErrorMessage name="password" component="div" className="text-red-500" />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded" disabled={isSubmitting}>
              {isSubmitting ? 'Signing up...' : 'Sign Up'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );

}

export default SignUp