import React from 'react'
import { useAuth } from '../utils/authContext'

export default function Dashboard() {
    const {setAuth,isAuthenticated,user} = useAuth()

    console.log(isAuthenticated,user)
    return (
        <div>
            <h2>This is Dashboard</h2>
        </div>
    )
}
