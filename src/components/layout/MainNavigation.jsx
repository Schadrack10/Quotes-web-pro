import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { useHistory, Link } from 'react-router-dom';
import { AuthContextProvider } from "../../store/auth-context";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const AuthCtx = useContext(AuthContext);
  const {isfederatedSignin, setIsfederatedSignin, user , setUser} = useContext(AuthContext);
  const history =  useHistory()

  const isLoggedIn = AuthCtx.isLoggedIn;

  const logoutHandler = () => {
    AuthCtx.logout();
    setIsfederatedSignin(false)
    history.replace('/auth')
  };


  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <img
          height={50}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShvIyrnkCCkXhbjmBFR2FHPOEPBm13DhU_uA&usqp=CAU"
          alt=""
        />
        great quotes
      </div>
      <nav className={classes.nav}>
        <ul>
          <li>
            {isLoggedIn || isfederatedSignin ? (
              <NavLink to="/quotes" activeClassName={classes.active}>
                All Quotes
              </NavLink>
            ): ''}
          </li>
          <li>
            {isLoggedIn || isfederatedSignin ? (
              <NavLink to="/new-quote" activeClassName={classes.active}>
                Add Quotes
              </NavLink>
            ) : ''}
          </li>
         
          {isLoggedIn || isfederatedSignin ?(
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
          ): ''}
           {isLoggedIn || isfederatedSignin ? (
           ''
          ) : 
            <li>
              <NavLink to="/auth">Login</NavLink>
            </li>
         }
          {isLoggedIn || isfederatedSignin ? (
            <li>
              <button
                style={{ color: "inherit", background: "none", color:'white', fontSize:18 , border:"none", cursor:'pointer'}}
                onClick={logoutHandler}
              >
                <li className={classes.logoutText}>Logout</li>
              </button> 
            </li>
          ) : ''}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

