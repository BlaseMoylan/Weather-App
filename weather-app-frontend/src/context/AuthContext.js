import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import jwtDecode from "jwt-decode";

import UrlContext from './UrlContext';

const AuthContext = createContext()
export default AuthContext

function setUserObject(user){
    if(!user){
        return null
    }

    return {
        email: user.email,
        id: user.id,
    }
}

export const AuthProvider = ({children}) => {
    const { baseUrl } = useContext(UrlContext)

    const userToken = JSON.parse(localStorage.getItem('token'))
    const decodedUser = userToken ? jwtDecode(userToken) : null

    const [token, setToken] = useState(userToken)
    const [user, setUser] = useState(setUserObject(decodedUser))
    const navigate = useNavigate()

    const [isServerError, setIsServerError] = useState(false)

    const registerUser = async (registerData) => {
        try{
            let finalData = {
                email: registerData.email,
                password: registerData.password,
                phone_number: registerData.phoneNumber
            }

            let response = await axios.post(`${baseUrl}/auth/register`, finalData)

            if(response.status === 201){
                console.log('Successful Registration!')
                loginUser({email: registerData.email, password:registerData.password})
            }else{
                console.log('Error')
            }

        }catch(error) {
            if(!error?.response){
                return 'No Server Response'
            } else if(error.response?.status === 409){
                return 'Email already exist'
            } else {
                return 'Registration Failed'
            }
        }
    }

    const loginUser = async (loginData) => {
        try{
            let response = await axios.post(`${baseUrl}/auth/login`, loginData)

            if(response.status === 200){
                localStorage.setItem('token', JSON.stringify(response.data.access))
                setToken(JSON.parse(localStorage.getItem('token')))

                let loggedInUser = jwtDecode(response.data.access)
                setUser(setUserObject(loggedInUser))

                setIsServerError(false)
            }

        }catch(error){
            console.log(error)
            setIsServerError(true)
        }
    }

    const logoutUser = () => {
        if(user){
            localStorage.removeItem('token')
            setUser(null)
            setToken(null)
        }
    }

    const forgotPassword = async (forgotPasswordData) => {
        try{
            let response = await axios.post(`${baseUrl}/auth/forgot_password`, forgotPasswordData)
            console.log(response.data)
        }catch(error){
            console.log(error)
        }
    }

    const resetUserPassword = async (resetData) => {
        try{
            let response = await axios.post(`${baseUrl}/auth/reset_password`, resetData)
            console.log(response.data)
        }catch(error){
            console.log(error)
        }
    }

    const authContextData = {
        user,
        token,
        loginUser,
        logoutUser,
        registerUser,
        forgotPassword,
        resetUserPassword,
        isServerError
    }

    return(<AuthContext.Provider value={authContextData}>{children}</AuthContext.Provider>)
}