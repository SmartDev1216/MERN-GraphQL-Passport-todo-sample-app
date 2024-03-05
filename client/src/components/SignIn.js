import React from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik';
import * as Yup from 'yup'
import { useMutation } from '@apollo/client';
import { SIGN_IN } from '../graphql/queries';
import setToken from '../utils/token';

const SignInSchema = Yup.object().shape({
    email:Yup.string().email('Invalid email').required('Email is required'),
    password:Yup.string().required('Password is required')
})

const SignIn = () => {
    const [signIn] = useMutation(SIGN_IN)

    const handleSubmit = async (values,{setSubmitting}) => {
        try {
            const res = await signIn({variables:values})
            console.log(res.data.signIn.token)
            if(res.data.signIn.token){
              setToken(res.data.signIn.token)
            }
            alert('Sign in successful')
        } catch(error){
            alert(error.message);
        }
        setSubmitting(false)
    }

    return (
        <div className="max-w-md mx-auto mt-[100px]">
          <h2 className="text-2xl font-bold mb-4">Sign In</h2>
          <Formik initialValues={{ email: '', password: '' }} validationSchema={SignInSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form>
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
                  {isSubmitting ? 'Signing in...' : 'Sign In'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      );
}

export default SignIn