import Link from 'next/link';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../stores/authContext';

//image
const logoHead = require('../../img/favicon.png');

const Header = ({enableHeaderScrollAnimation = true, ...props}) => {
  const {user, isAdmin, logout} = useContext(AuthContext);

  const [mobileNavClass,setMobileNavClass] = useState(false);

  const closeNav = ()=>{
      document.body.style.overflow = 'unset';
      setMobileNavClass(false);
  }

  const openNav = ()=>{
      document.body.style.overflow = 'hidden';
      setMobileNavClass(true);
  }

  const LinkExit = ({children, href, ...props}) => <span onClick={closeNav}><Link href={href} {...props}>{children}</Link></span>;
  
  return (
    <header {...props} className={`header`}>
      <div className="header-inner lg:text-base text-sm">
        <div className="flex items-center">
          <span className="header-logo">
            <img src={logoHead} alt="favicon" />
          </span>
          <span className="inline header-title ml-3 text-xl">SEACF13</span>
        </div>
        <nav className={`header-nav hidden md:flex`}>
          <ul>
            <li><Link href="/">Home</Link></li>
            {
              (user && isAdmin()) && <>
                <li><Link href="/admin">Admin</Link></li>
              </>
            }
            {
              user ? 
                <>
                  <li><Link href="/appointment"><a>My<br/>Appointment</a></Link></li>
                  <li><Link href="/appointment/list"><a>Appointment<br/>List</a></Link></li>
                  <li><Link href="/account">Account</Link></li>
                  <li><Link href="/"><a onClick={logout}>Logout</a></Link></li>
                </>
                :
                <>
                  <li><Link href="/login">Login</Link></li>
                  <li><Link href="/register">Register</Link></li>
                </>
            }
          </ul>
        </nav>
        <div className="flex md:hidden nav-toggle-wrapper"><i className="fas fa-bars" onClick={openNav}/></div>
        <nav className={`header-nav-mobile py-2 ${mobileNavClass && "active"} flex md:hidden`}>
          <div className="nav-close-wrapper flex justify-end px-5 pb-2">
              <i className="fas fa-times" onClick={closeNav}/>
          </div>
          <ul>
            <li><LinkExit href="/">Home</LinkExit></li>
            {
              (user && isAdmin()) && <>
                <li><LinkExit href="/admin">Admin</LinkExit></li>
              </>
            }
            {
              user ? 
                <>
                  <li><LinkExit href="/appointment">My Appointment</LinkExit></li>
                  <li><LinkExit href="/appointment/list">Appointment List</LinkExit></li>
                  <li><LinkExit href="/account">Account</LinkExit></li>
                  <li><LinkExit href="/"><a onClick={logout}>Logout</a></LinkExit></li>
                </>
                :
                <>
                  <li><LinkExit href="/login">Login</LinkExit></li>
                  <li><LinkExit href="/register">Register</LinkExit></li>
                </>
            }
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
