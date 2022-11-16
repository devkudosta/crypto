import React from 'react';
import {Row, Col, Card} from 'react-bootstrap';
import Aux from "../../hoc/_Aux";  

class NotFound extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null, 
        } 
    }   
    render() {   
        return (
            <Aux>
                <Row>
                    <Col md={12} xl={12}>
                        <Card>
                            <Card.Body>  
                                <div align={'center'}>
                                    <h3>Not Found!</h3>
                                    <h5><a href="/dashboard/default">Dashboard</a></h5>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col> 
                </Row>
            </Aux>
        );
    }
}

export default NotFound;