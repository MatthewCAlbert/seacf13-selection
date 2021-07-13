import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  user: null,
  login: (data) => {},
  logout: ()=>{},
  isAdmin: () : boolean => true
})

export const AuthContextProvider = ({children})=>{
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if( user === null && localStorage.getItem("_user") !== null ){
      const s = JSON.parse(localStorage.getItem("_user"));
      if( s ) setUser(s);
    }
  }, [])

  const login = (data)=>{
    const token = data.token.token;
    data = {...data, token}
    setUser(data);
    localStorage.setItem("_token", token );
    localStorage.setItem("_user", JSON.stringify(data) );
  }
  const logout = ()=>{
    setUser(null);
    localStorage.removeItem("_token");
    localStorage.removeItem("_user");
  }

  const isAdmin = ()=>{
    if( user === null ) return false;
    const {role} = user;
    return parseInt(role) === 1;
  }

  const context = { user, login, logout, isAdmin }

  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  )
}