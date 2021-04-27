import { createContext, useState, useEffect } from "react";

export const LoginContext = createContext();

const LoginProvider = (props) => {
    const [loginState, setLoginState] = useState(true)
    const [currentUser, setCurrentUser] = useState(null);
    
    const checkUser = async () => {
      let user = await fetch(`/api/v1/user/whoami`);
      user = await user.json();
      console.log(user);
      setCurrentUser(user)       
    }

    useEffect(() => {
      checkUser()
      console.log(props.value.isAuth)
    },[])
    
    const registerNewUser = async (newUser) => {
        let result = await fetch("/api/v1/user/register", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        });
        result = await result.json();
        console.log(result)
        if(result) {
          props.value.setIsAuth(true)
        }  
        return result;
    };

    const loginUser = async (user) => {
        let result = await fetch("/api/v1/user/login", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        });
        result = await result.json();
        checkUser()
        if(result) {
          props.value.setIsAuth(true)
        }     
        
        return result;
    }

    const logoutUser = async () => {
      let user = await fetch(`/api/v1/user/logout`);
      user = await user.json();
      console.log(user);      
      setCurrentUser(user)
      props.value.setIsAuth(false)      
    }

    const values = {
        registerNewUser,
        loginUser,
        logoutUser,
        loginState, 
        setLoginState,
    };    

    return (
    <LoginContext.Provider value={values}>
        {props.children}
    </LoginContext.Provider>
    );
}

export default LoginProvider;