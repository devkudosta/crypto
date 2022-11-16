import React, {Component} from 'react'; 
import {Link} from 'react-router-dom';
import { Nav } from 'react-bootstrap'; 
import Aux from "../../../../hoc/_Aux";

class Footer extends Component {
    
    componentDidMount() {
         
    }; 
    render() { 
        let footer = '';         
        footer = (
            <div className="footer-main-container">
                <div className='footer-logo-img'>
                    <img src='/assets/img/logo.png' alt='logo'/>
                </div>
                {/* <div className='donet-btn'>
                    <button >Support CryptoTrust - Donate</button>
                </div> */}
                <div className='footer-menu'>
                <Nav >
                    <Nav.Link as={Link} exact  to="/dashboard/Home" activeclassname="active" >
                        <i className="fa fa-home"></i>Home
                    </Nav.Link>
                    <Nav.Link as={Link} exact  to="/dashboard/abouts" activeclassname="active">
                        <i className="fa fa-user"></i>About us
                    </Nav.Link>
                    <Nav.Link as={Link }exact  to="/dashboard/privacypolicy" activeclassname="active">
                        <i className="fa fa-shield-alt"></i>Privacy policy
                    </Nav.Link>
                    <Nav.Link as={Link} exact  to="/dashboard/contactus" activeclassname="active">
                        <i className="fa fa-address-book"></i>Contact us
                    </Nav.Link>
                </Nav>
                    <p>© 2022 CryptoTrust, All Right Reserved.</p>
                </div>
            </div>
        ); 
        return (
            <Aux>
                {footer}
            </Aux>
        );
    }
}

export default Footer;