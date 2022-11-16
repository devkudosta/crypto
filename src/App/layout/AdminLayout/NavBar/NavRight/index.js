import React, { Component } from 'react'; 
import Aux from "../../../../../hoc/_Aux";   
 
class NavRight extends Component { 
    constructor(props) {
        super(props) 
        this.state = {  
        }  
    }  
    
    async componentDidMount(){   
           
    } 
    render() {    
        return (
            <Aux>
                <ul className="navbar-nav ml-auto">  
                </ul> 
            </Aux>
        );
    }
}

export default NavRight;
