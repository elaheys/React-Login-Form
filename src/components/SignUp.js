import React, { useEffect, useState,useReducer } from 'react';
import { Link } from 'react-router-dom';

//fontawsome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons'

//components
import { validate } from './validate';
import { notify } from './toast';

//toastify
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

//style
import styles from "./SignUp.module.css";



const initialState = {
    change:false
}

const reducer = (state,action) => {
    switch (action){
        case 'PASSWORD':
            return{...state,change: !state.change}
        case 'CONFIRM-PASSWORD':
            return{...state,change: !state.change }
        default:
            return state;
    }
}

const SignUp = () => {

    const [toggle , dispatch] = useReducer(reducer,initialState);
    const [toggle2 , dispatch2] = useReducer(reducer,initialState);

    const [data,setData] = useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
        isAccepted:false
    })

    const [errors,setErrors] = useState({});
    const [touched,setTouched] = useState({});

    useEffect(() => {
        setErrors(validate(data,"signup"))
    },[data,touched])


    const changeHandler = event => {
        if(event.target.name === "isAccepted" ){
            setData({...data,[event.target.name] : event.target.checked })
        }else{
            setData({...data,[event.target.name] : event.target.value})
        }
    }

    const focusHandler = event => {
        setTouched({...touched, [event.target.name]: true})
    }

    const submitHandler = event => {
        event.preventDefault();
        if(!Object.keys(errors).length){
            notify("You signed in successfully!" , "success")
        }else{
            notify("Invalid Data!" , "error")
            setTouched({
                name:true,
                email:true,
                password:true,
                confirmPassword:true,
                isAccepted:true
            })
        }
    }
    

    return (
        <div className={styles.container}>
            <form onSubmit={submitHandler} className={styles.formContainer}>
                <h2 className={styles.header}>Sign Up</h2>
                <div className={styles.formField}>
                    <label>Name</label>
                    <input 
                    className={(errors.name && touched.name ? styles.uncompleted : styles.formInput)}
                    type="text"
                    name="name" 
                    value={data.name} 
                    onChange={changeHandler} 
                    onFocus={focusHandler}
                    />
                    {errors.name && touched.name && <span>{errors.name}</span>}
                </div>
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
                        type={toggle.change ? 'text' : 'password'}
                        name="password" 
                        value={data.password} 
                        onChange={changeHandler} 
                        onFocus={focusHandler}/> 
                        <div onClick={() => dispatch('PASSWORD')} className={styles.inner}>
                            {toggle.change ? 
                            <FontAwesomeIcon icon={faEye}/>:
                            <FontAwesomeIcon icon={faEyeSlash} />}
                        </div>
                    </div>
                    {errors.password && touched.password && <span>{errors.password}</span>}
                </div>
                <div className={styles.formField}>
                    <label>Confirm Password</label>
                    <div className={styles.wraper}>
                        <input 
                        className={(errors.confirmPassword && touched.confirmPassword ? styles.uncompleted : styles.formInput)}
                        type={toggle2.change ? 'text' : 'password'} 
                        name="confirmPassword" 
                        value={data.confirmPassword} 
                        onChange={changeHandler} 
                        onFocus={focusHandler}/>
                        <div onClick={() => dispatch2('CONFIRM-PASSWORD')} className={styles.inner}>
                            {toggle2.change ? 
                            <FontAwesomeIcon icon={faEye}/>:
                            <FontAwesomeIcon icon={faEyeSlash} />}
                        </div>
                    </div>
                    {errors.confirmPassword && touched.confirmPassword && <span>{errors.confirmPassword}</span>}
                </div>
                <div className={styles.formField}>
                    <div className={styles.checkBoxContainer}>
                        <label>I accept terms of privacy policy</label>
                        <input 
                        type="checkbox" 
                        name="isAccepted"
                        value={data.isAccepted} 
                        onChange={changeHandler} 
                        onFocus={focusHandler}/>
                    </div>
                    {errors.isAccepted && touched.isAccepted && <span>{errors.isAccepted}</span>}
                </div>
                <div className={styles.formButtons}>
                    <Link to="/login">Login</Link>
                    <button type='submit'>Sign Up</button>
                </div>
            </form>
            <ToastContainer/>
        </div>
    );
};

export default SignUp;