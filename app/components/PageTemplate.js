"use client"
import Header from "./Header"
import Footer from "./Footer"

const PageTemplate = ({children, title}) => {
    return(
        <>
        <Header/>
            <main className="main">
                { title && <div className="page-title">{title}</div>}
                {children}
                </main>
            <Footer/>
        </>
    )
}

export default PageTemplate