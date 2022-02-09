import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    
    return (
        <Fragment>
            <footer className="py-1">

                <p className="text-center mt-1"><Link to="/privacy">Privacy Policy</Link> | <span>support : <a href='tel:56301591'>(+266) 5630 1591</a></span></p>
                        
               <p className="text-center mt-1">
                    <span dangerouslySetInnerHTML={{"__html":"&copy;"}}></span> ShopMO - {new Date().getFullYear()}, All Rights Reserved.
                </p> 
                </footer>
        </Fragment>
    )
}

export default Footer
