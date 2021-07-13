import { useState } from 'react'
import Footer from './Footer'
import Header from './Header'

const Layout = ({children, ...props}) => {

  return (
    <div className="web-wrapper">
      <Header/>
      <main className="main-container">
        {children}
      </main>
      <Footer/>
    </div>
  )
}

export default Layout
