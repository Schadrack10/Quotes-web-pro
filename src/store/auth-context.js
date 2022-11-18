import React from "react";
import { useState, useEffect, useCallback } from "react";





let logoutTimer;


const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => { },
    logout: () => { },

})

const calculateRemainingTime = (expirationTime) => {
    const currenttime = new Date().getTime()
    const adjExpirationTime = new Date(expirationTime).getTime()

    const remainingDuration = adjExpirationTime - currenttime

    return remainingDuration

}


const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token')
    const storedExpirationDate = localStorage.getItem('expirationTime')

    const remainingTime = calculateRemainingTime(storedExpirationDate)
    if (remainingTime <= 3600) {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');

        return null;
    }

    return {
        token: storedToken,
        duration: remainingTime
    }
}

export const AuthContextProvider = (props) => {


    const tokenData = retrieveStoredToken()
    let initialToken;

    if (tokenData) {
        initialToken = tokenData.token

    }


    const [token, setToken] = useState(initialToken)
    const[isfederatedSignin, setIsfederatedSignin]=  useState(false)
    const[user, setUser]=  useState('')
    const userIsLoggedIn = !!token

    const loginHandler = (token, expirationTime) => {
        setToken(token)
        localStorage.setItem('token', token)
        localStorage.setItem('expirationTime', expirationTime);

        const remaingTime = calculateRemainingTime(expirationTime);

        logoutTimer = setTimeout(() => {
            loginHandler()
        }, remaingTime)
    }


    const logoutHandler = useCallback(() => {
        setToken(null)
        localStorage.removeItem('token')
        localStorage.removeItem('expirationTime')


        if (logoutTimer) {
            clearTimeout(logoutTimer)
        }

    }, [])


    useEffect(() => {

        if (token) {
            console.log(tokenData.duration)
            logoutTimer = setTimeout(logoutHandler, tokenData.duration)
        }

    }, [tokenData, logoutHandler])




    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        isfederatedSignin:isfederatedSignin,
        setIsfederatedSignin:setIsfederatedSignin,
        user:user,
        setUser:setUser
    }



    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )

}



export default AuthContext