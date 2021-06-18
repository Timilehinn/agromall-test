import React,{ useState, createContext, useEffect } from 'react'


export const AuthContext = createContext();

function AuthContextApi(props) {

    const [ auth, setAuth ] = useState(false);
    const [ userDetails, setUserDetails ] = useState([]);
    const [ files, setFiles ] = useState([]);
    const [ folders, setFolders ] = useState([])

    const allValues = {auth, setAuth, userDetails, setUserDetails, files, setFiles, folders, setFolders };
     
    
    return (
        <AuthContext.Provider value={allValues} >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextApi
