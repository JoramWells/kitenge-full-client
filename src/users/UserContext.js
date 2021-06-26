import React, { createContext } from 'react'
// import { useSelector } from 'react-redux';

export const UserContext = createContext()

export const UserProvider = (props) =>{
//   const userSignin = useSelector((state) => state.userSignin);
//   const { userInfo } = userSignin;


    return(
        <UserContext.Provider value={"Dozens"}>
            {props.children}
        </UserContext.Provider>
    )
}