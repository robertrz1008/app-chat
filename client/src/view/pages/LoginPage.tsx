import { useAuth } from "../../context/AppContext.tsx" 
import "../css/RegisterPage.css"
import {useForm, SubmitHandler} from "react-hook-form"
import { FormValues, AppContextIn, User } from "../../interfaces/contextInterfaces.ts"
import {Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"

function LoginPage() {

    
    const {register, handleSubmit, formState:{errors}} = useForm<FormValues>()
    const {isDisabled, singIn, isAutenticate, authLoading, errors: loginErrors} = useAuth() as AppContextIn
    const navigate = useNavigate()

    useEffect(() => {
        if(isAutenticate) navigate("/chat")
      },[isAutenticate])

    const submit: SubmitHandler<FormValues> = async (data) => {
        singIn(data as User)
    }
   


  return (
    <div className='authPage'>
        <form 
            onSubmit={ handleSubmit(submit) }
            className="auth-con"
        >

            <h1 >FaciChat</h1>

            <div className="auth-body">
                <input 
                    className="auth-input" 
                    type="email" 
                    {...register("email", {required: true})}
                    placeholder="Correo"
                />
                {
                    errors.email && (
                        <p>El correo es requerido</p>
                    )
                }
                <input 
                    className="auth-input" 
                    type="password" 
                    {...register("password", {required: true})}
                    placeholder='Contraseña'
                />
                {
                    errors.password && (
                        <p>La contraseña es requerida</p>
                    )
                }
            </div>
            {
                loginErrors? loginErrors.map((error, id) => (
                    <div key={id} className="error-list">
                        {error}
                    </div>
                )) : ""
            }
            <button 
                disabled={isDisabled}
                className={authLoading? "auth-buttonOff" : "auth-btn"}
            >
                {
                authLoading? "Iniciando Session..." : "Inicar Sesion"
                }
            </button>
            
        </form>

        <div className="auth-link-p"> 
            <Link to={"/register"} className="auth-link">¿Aun no tientes una cuenta?</Link>
        </div>
    </div>
  )
}

export default LoginPage