import React, {createContext,useState,useContext} from 'react'
const AuthContext = createContext()



export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user,setUser] = useState({})

    const setAuth = (userData) =>{
        setUser(userData)
        setIsAuthenticated(true)
    }


    const authLogout = () => {
        setIsAuthenticated(false)
        setUser({})       
    }

    return (
        <AuthContext.Provider value = {{isAuthenticated,user,setAuth,authLogout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)