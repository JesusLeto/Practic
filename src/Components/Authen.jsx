import React, {useState} from 'react'


const Authen = ({CloseForm, SingIn}) => {

    const [LoginUser, setLoginUser] = useState("")
    const [PasswordUser, setPasswordUser] = useState("")
    const [LoginBlur, setLoginBlur] = useState(false)
    const [PasswordBlur, setPasswordBlur] = useState(false)
    const [LoginError, setLoginError] = useState("Login cannot be empty")
    const [PasswordError, setPasswordError] = useState("Password cannot be empty")

    const SetBlur = e =>{
        switch(e.target.name){
            case "Login":
                setLoginBlur(true);
                break;
            case "Password":
                setPasswordBlur(true);
                break; 
            default:
                break;       
        }
    }

    //Check validation email
    const validateEmail = email => {
        if(!email){
            setLoginError("Login cannot be empty")
        }
        else{
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!re.test(String(email).toLowerCase())){
                setLoginError("No Valid")
            }
            else{
                setLoginError("")
            }
        }
    }

    //Check password length
    const LengthPass = pass => {
        if(pass.length === 0)
            setPasswordError("Password cannot be empty")
        else if(pass.length < 3 || pass.length > 8 )
            setPasswordError("Invalind password length")   
        else
        setPasswordError("") 

    }


    return(
        <div className = "Authen">

            {(LoginError&&LoginBlur)&& <div style = {{color: "red"}}>{LoginError}</div>}

            <input className= "Login" type="text" name = "Login" placeholder = "Login"
            value = {LoginUser} onChange = {e => {setLoginUser(e.target.value); validateEmail(e.target.value); setLoginBlur(false)}}
            onBlur = {e => SetBlur(e)}/>

            {(PasswordError&&PasswordBlur)&& <div style = {{color: "red"}}>{PasswordError}</div>}

            <input className= "Password" type="text" name = "Password" placeholder = "Password (3-8 symbols)"
            value = {PasswordUser} onChange = {e => {setPasswordUser(e.target.value); setPasswordBlur(false); LengthPass(e.target.value)} }
            onBlur = {e => SetBlur(e)}/>

            <button onClick = {() => {
                CloseForm();
                SingIn({"login": LoginUser, "password": PasswordUser})

            }} disabled = {LoginError || PasswordError} >Sing Up</button>
            <button onClick = {CloseForm} >Exit</button>

        </div>
        
    )
}

export default Authen