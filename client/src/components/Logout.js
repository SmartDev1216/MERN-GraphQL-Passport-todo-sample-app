import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { LOGOUT_MUTATION } from '../graphql/queries'
import setToken from '../utils/token'
import { useAuth } from '../utils/authContext'

export default function Logout() {
    const navigate = useNavigate()
    const {authLogout} = useAuth()
    const [logoutMutation] = useMutation(LOGOUT_MUTATION)
    const handleLogout = async () => {
        try { 
          const {data} = await logoutMutation()
          console.log(data)
          if (data&&data.logout){
            setToken()
            authLogout()
            navigate('/signin')  
          }
        } catch (error) {
           console.error('Logout failed:' , error)
        }
    }

    return (
        <button onClick={handleLogout}>Logout</button>
    )
}
