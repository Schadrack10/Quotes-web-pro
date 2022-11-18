import classes from './ProfileForm.module.css';
// import AuthContext from '../../store/auth-context';
import AuthContext from '../store/auth-context';
import { useHistory } from 'react-router-dom';
import { useRef, useContext } from 'react';

const ProfileForm = () => {

const newPasswordInputRef =  useRef()
const AuthCtx  = useContext(AuthContext)
const history = useHistory()



const submitHandler = (event)=>{
  event.preventDefault()

  const enteredNewPassword = newPasswordInputRef.current.value

  //validation
  fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDCzStemUJ0Qy22wPuR-GrR7WYt0fQb6C8',{
    method:'POST',
    body:JSON.stringify({
      idToken:AuthCtx.token,
      password:enteredNewPassword,
      returnSecureToken:false
    }),
    headers:{
      'Content-Type':'application/json'
    }
  })
  .then(res=>{

     history.replace('/')
  })


  
}


  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength={7} ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
