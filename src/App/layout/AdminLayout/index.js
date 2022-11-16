import React, { Component, Suspense } from 'react';
import {Route, Switch, Redirect,Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Fullscreen from "react-full-screen";
import windowSize from 'react-window-size';
import Footer from './Footer'; 
import Breadcrumb from './Breadcrumb';
import Loader from "../Loader";
import routes from "../../../routes";
import Aux from "../../../hoc/_Aux";
import * as actionTypes from "../../../store/actions";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"; 
import { Nav, Navbar } from 'react-bootstrap'; 

import './app.scss';
let settings = {
    dots: false,
    arrow:true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1
  };
class AdminLayout extends Component {

    fullScreenExitHandler = () => {
        if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            this.props.onFullScreenExit();
        }
    };

    componentWillMount() {
        if (this.props.windowWidth > 992 && this.props.windowWidth <= 1024 && this.props.layout !== 'horizontal') {
            this.props.onComponentWillMount();
        }
    }

    mobileOutClickHandler() {
        if (this.props.windowWidth < 992 && this.props.collapseMenu) {
            this.props.onComponentWillMount();
        }
    }

    render() {

        /* full screen exit call */
        document.addEventListener('fullscreenchange', this.fullScreenExitHandler);
        document.addEventListener('webkitfullscreenchange', this.fullScreenExitHandler);
        document.addEventListener('mozfullscreenchange', this.fullScreenExitHandler);
        document.addEventListener('MSFullscreenChange', this.fullScreenExitHandler);

        const menu = routes.map((route, index) => {
            return (route.component) ? (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={props => (
                        <route.component {...props} />
                    )} />
            ) : (null);
        });

        return (
            <Aux>                
                <Fullscreen enabled={this.props.isFullScreen}>
                    <div className='header-slider-custom'>
                        <div className='slider_heading'>
                            <h3>Popular:</h3>
                        </div>
                        <div className='popular_slider_outer'>
                            <Slider {...settings}>
                                <div className='slider_box'>
                                    <p>BTC :<span className='pop_up'><i className="fa fa-caret-up"></i> $42,500</span></p>
                                </div>
                                <div className='slider_box'>
                                    <p>BTC :<span className='pop_down'><i className="fa fa-caret-up"></i> $42,500</span></p>
                                </div>
                                <div className='slider_box'>
                                    <p>BTC :<span className='pop_up'><i className="fa fa-caret-up"></i> $42,500</span></p>
                                </div>
                                <div className='slider_box'>
                                    <p>BTC :<span className='pop_up'><i className="fa fa-caret-up"></i> $42,500</span></p>
                                </div>
                                <div className='slider_box'>
                                    <p>BTC :<span className='pop_down'><i className="fa fa-caret-up"></i> $42,500</span></p>
                                </div>
                                <div className='slider_box'>
                                    <p>BTC :<span className='pop_up'><i className="fa fa-caret-up"></i> $42,500</span></p>
                                </div>
                                
                            </Slider>
                        </div>
                    </div>

<div className="custom-header">
    <div className="container">
        <div className="row">
        
            <div className="col-md-3 col-sm-12 logo"> 
                <Nav.Link as={Link} to="/dashboard/Home" >
                    <img src="https://crypto.projectsapproval.com/assets/img/logo.png" alt="logo"/>
                </Nav.Link> 
            </div>
            <div className="header-menu-custom col-md-9 col-sm-12"> 
            <Navbar collapseOnSelect expand="md" variant="dark">
            <Navbar.Toggle aria-controls="navbarScroll" data-bs-target="#navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav >
                        <Nav.Link as={Link} exact  to="/dashboard/Home" activeclassname="active" >
                            <i className="fa fa-home"></i>Home
                        </Nav.Link>
                        <Nav.Link as={Link} exact  to="/dashboard/abouts" activeclassname="active">
                            <i className="fa fa-user"></i>About us
                        </Nav.Link>
                        <Nav.Link as={Link}exact  to="/dashboard/privacypolicy" activeclassname="active">
                            <i className="fa fa-shield-alt"></i>Privacy policy
                        </Nav.Link>
                        <Nav.Link as={Link} exact  to="/dashboard/contactus" activeclassname="active">
                            <i className="fa fa-address-book"></i>Contact us
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            </div>
        </div>
    </div>
</div>

                    <div className='body-section'>
                    <div className="pcoded-main-container" onClick={() => this.mobileOutClickHandler}>
                        <div className="pcoded-wrapper">
                            <div className="pcoded-content">
                                <div className="pcoded-inner-content">
                                    <Breadcrumb />
                                    <div className="main-body">
                                        <div className="page-wrapper">
                                            <Suspense fallback={<Loader/>}>
                                                <Switch>
                                                    {menu}
                                                    <Redirect from="/" to={this.props.defaultPath} />
                                                </Switch>
                                            </Suspense>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>  
                    </div>
                    <Footer />
                </Fullscreen> 
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        defaultPath: state.defaultPath,
        isFullScreen: state.isFullScreen,
        collapseMenu: state.collapseMenu,
        configBlock: state.configBlock,
        layout: state.layout
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFullScreenExit: () => dispatch({type: actionTypes.FULL_SCREEN_EXIT}),
        onComponentWillMount: () => dispatch({type: actionTypes.COLLAPSE_MENU})
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (windowSize(AdminLayout));