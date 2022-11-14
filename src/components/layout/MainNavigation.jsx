import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './MainNavigation.module.css'

const MainNavigation = () => {

  return (

    <header className={classes.header}>
        
         <div className={classes.logo}>
           <img height={50} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShvIyrnkCCkXhbjmBFR2FHPOEPBm13DhU_uA&usqp=CAU" alt="" />
          great quotes
          </div>
         <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink to="/quotes" activeClassName={classes.active}>
                 All Quotes
              </NavLink>
            </li>
            <li>
              <NavLink to="/new-quote" activeClassName={classes.active}>
                 Add a Quote
              </NavLink>
            </li>
          </ul>
         </nav>
    </header>

  )
}

export default MainNavigation