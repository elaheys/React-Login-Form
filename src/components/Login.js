import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

//fontawsome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons';

//components
import { validate } from './validate';
import { notify } from './toast';

//toastify
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//style
import styles from "./SignUp.module.css";


const Login = () => {
   
    const [data,setData] = useState({
        email:"",
        password:""
    })

    const [isShow,setIsShow] = useState(false)
    const [errors,setErrors] = useState({});
    const [touched,setTouched] = useState({});

    useEffect(() => {
        setErrors(validate(data,"login"))
    },[data,touched])


    const changeHandler = event => {
        setData({...data,[event.target.name] : event.target.value})
    }

    const focusHandler = event => {
        setTouched({...touched, [event.target.name]: true})
    }

    const submitHandler = event => {
        event.preventDefault();
        if(!Object.keys(errors).length){
            notify("You loged in successfully!" , "success")
        }else{
            notify("Invalid data!" , "error")
            setTouched({
                email:true,
                password:true
                
            })
        }
    }

    const toggleHandle = () => {
        setIsShow(prevState => ! prevState)
    }
    

    return (
        <div className={styles.container}>
            <form onSubmit={submitHandler} className={styles.formContainer}>
                <h2 className={styles.header}>Login</h2>
            
                <div className={styles.formField}>
                    <label>Email</label>
                    <input 
                    className={(errors.email && touched.email ? styles.uncompleted : styles.formInput)}
                    type="text" 
                    name="email" 
                    value={data.email} 
                    onChange={changeHandler}
                    onFocus={focusHandler}/>
                    {errors.email && touched.email && <span>{errors.email}</span>}
                </div>
                <div className={styles.formField}>
                    <label>Password</label>
                    <div className={styles.wraper}>
                       <input 
                        className={(errors.password && touched.password ? styles.uncompleted : styles.formInput)}
                        type={isShow ? 'text' : 'password'} 
                        name="password" 
                        value={data.password} 
                        onChange={changeHandler} 
                        onFocus={focusHandler}/> 
                        <div onClick={toggleHandle} className={styles.inner}>
                            {isShow ? 
                            <FontAwesomeIcon icon={faEye}/>:
                            <FontAwesomeIcon icon={faEyeSlash} />}
                        </div>
                    </div>
                    
                    {errors.password && touched.password && <span>{errors.password}</span>}
                </div>
            
            
                <div className={styles.formButtons}>
                    <Link to="/signup">Sign Up</Link>
                    <button type='submit'>Login</button>
                </div>
            </form>
            <ToastContainer/>
        </div>
    );
};


export default Login;