import { createContext, useContext } from "react";

const AuthContext = createContext("")

const AuthComp = () => {

    return(
        <AuthContext>
            
        </AuthContext>
    )
}



export const Acontext = () => {
    return useContext(AuthContext)
}



