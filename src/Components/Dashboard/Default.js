import React , { Fragment }  from 'react'; 
import {Row, Col, Form, Button, Alert} from 'react-bootstrap';
import Aux from "../../hoc/_Aux";  
import APIService from "../../Utils/APIService";  
import axios from 'axios'
import Chart from 'chart.js/auto';
 
let ItemAPI = new APIService();
class Dashboard extends React.Component {
    constructor(props) {
        super(props); 
        this.state = { 
            success:null,   
            walletAddress: '',
            Searchres: '',
            SearchingStatus: 0,
        }  
    }  
    async getReports()
    {
        try{
            let res = await ItemAPI.getItem('v1/stats');
            console.log("result: ", res)
            if (res.status === 200) {  
                this.setState({
                    cases: res.data,
                }) 
            } 
        } 
        catch(err) 
        {
            this.setState({ error: err });
        }  
    }
   
    chartRef = React.createRef();
    async componentDidMount() {  
         //this.getReports(); 
		 const ctx = this.chartRef.current.getContext("2d");
		
		new Chart(ctx, {
			type: "line",
			data: {
				labels: ["2019", "2020", "2021", "2022", "2023", "2024", "2025"],
				datasets: [{ 
					data: [86,114,106,106,107,111,133,81,124,101,105,100,121,131,90,114,106,106,107,111,133],
					label: "Total",
					borderColor: "#3e95cd",
					backgroundColor: "#7bb6dd",
					fill: false,
				} 
				]
			},
		});
    }
    handleSubmit = async event => {
        event.preventDefault();
            this.setState({loading: true}); 
            try{ 
                this.setState({ error: "" });  
                const resIP = await axios.get('https://geolocation-db.com/json/'); 
                const data = {
                    address: this.state.address,
                    abuseTypeOther: this.state.abuseTypeOther,
                    abuser: this.state.abuser,
                    fromCountry: this.state.fromCountry,
                    fromCountryCode: this.state.fromCountryCode,
                    abuseTypeId: this.state.abuseTypeId,
                    type: this.state.type,
                    amount: this.state.amount,
                    ipAddress: resIP.data.IPv4
                    }  
                let resp = await ItemAPI.postItem('/v1/report', data);
                if(resp.status === 200)
                { 
                    this.setState({address: '', abuseTypeOther:'', abuser:'', fromCountry: '', fromCountryCode: '', abuseTypeId: '', type:'', amount:''});
                    window.scrollTo(0, 100);
                    this.setState({ success: "Successfully added!", loading: false });
                } 
                                  
            } 
            catch(err) 
            {
                global.is_flag = true;
                this.setState({ error: err, loading: false });
            }  

    };
    handleSubmit2 = async event => {
        event.preventDefault();
        if(this.state.walletAddress)
        {
            this.setState({loading: true}); 
            let resp = await ItemAPI.getItem('v1/search/free-tier?walletAddress='+this.state.walletAddress);
            console.log("resp: ", resp.data); 
            if(resp.status === 200)
            {
                this.setState({SearchingStatus: 1, Searchres:resp.data, loading: false});
            }
        }
    }
    handlechange = event => { 
        this.setState({
            [event.target.name]: event.target.value
        });
    };  
    render() {   
        const {SearchingStatus,Searchres,success,walletAddress, address, abuseTypeOther, abuser, fromCountryCode, fromCountry,type, abuseTypeId, amount} = this.state; 
        return (
        <Aux>
            { this.state.loading && 
            <div className="loading_outer">
                <div class="cp-spinner cp-round"></div>
                    {/* <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div> */}
            </div>
            }
            <div className="container">
                <Row>                                         
                    <Col md={12} sm={12} className="middle_body_section">
                        <h2>CRYPTO</h2> 
                        <h3 className="search_heading">	Search by your wallet address</h3>
                        <div className="search_form">
                            <form onSubmit={this.handleSubmit2} >   
                                <Form.Group controlId="walletAddress"> 
                                    <Form.Control type="text" name="walletAddress" placeholder="Search and report fraudulent crypto wallet addresses and smart contract" autoComplete="off" 
                                        value={walletAddress} onChange={this.handlechange}/>
                                    <div style={{fontSize:12, color:"red"}}>
                                        {this.state.walletAddressError}
                                    </div>
                                    <div className="formerror">
                                        {this.state.walletAddressError}
                                    </div>
                                </Form.Group>  
                                <Button className="btn searching_btn shadow-2 mb-4" type="submit">Search</Button> 
                                
                            </form>
                        </div>
                        {SearchingStatus === 1 && <div className='serchresult'>
                            <h5>Address : {Searchres.address}</h5>
                            <h5>Comments : {Searchres.timesReported === 0 && <span>Data not found</span>}</h5>
                            {Searchres.timesReported > 0 &&
                         <ul className="search-data">
                                    {Searchres.comments && 
                                    Searchres.comments.map((products,idx) => (
                                        <Fragment key={idx}>
                                            {products && 
                                        <li>{products}</li>
                                            }
                                        </Fragment>
                                    ))}
                            </ul> }
                        </div>}
                        <Row className="report_section"> 
                            <Col md={6} sm={12} className="report_box">
                                <div className="report_box_inner">
                                    <div className="header_box">
                                        <h6><span><img src="/assets/img/ethereum.png" width={20} height={20} alt="icon" /> Ethereum (ETH) </span><span className="doller_amt">$42,500</span></h6>
                                    </div>
                                    <div className='eth_content'>
                                        <p>Market Status  </p>
                                        <ul>
                                            <li><label>Market Cap </label> $355.5B</li>
                                            <li><label>Volume (24H) </label> $17.5B</li>
                                            <li><label>Popularity </label> #2</li>
                                            <li><label>Today High </label> $43,008</li>
                                        </ul> 
                                        <canvas id="myChart" ref={this.chartRef} />
                                    </div>
                                </div>
                            </Col>
                            <Col md={6} sm={12} className="report_box">
                                <div className="report_box_inner">
                                <div className="header_box">
                                    <h6 className='form_caption'>REPORT</h6>
                                </div>
                                { success && 
                                    <Col md={12} xl={12}>
                                        <Alert variant="success">{success}</Alert>  
                                    </Col> 
                                }
                                <form onSubmit={this.handleSubmit} className="form-class">  
                                    <Form.Group controlId="abuseTypeId">
                                        <Form.Label>Select AbuseType</Form.Label> 
                                        <Form.Control as="select" type="select" name="abuseTypeId" onChange={this.handlechange} value={abuseTypeId} autoComplete="off">
                                            <option value="">select AbuseType</option> 
                                            <option value="phishing">Phishing</option>  
                                            <option value="email_scam">Email scam</option>  
                                            <option value="blackmail">Blackmail</option>  
                                            
                                        </Form.Control>
                                        <div style={{fontSize:12, color:"red"}}>
                                            {this.state.userroleError}</div>
                                    </Form.Group>                                     
                                    <Form.Group controlId="address">
                                            <Form.Label>The Bitcoin Address</Form.Label>
                                            <Form.Control type="text" placeholder="The Bitcoin Address" name="address" 
                                        value={address} onChange={this.handlechange} required autoComplete="off"/>
                                        <div style={{fontSize:12, color:"red"}}>
                                            {this.state.walletAddressError}</div>
                                            <div className="formerror">
                                                {this.state.walletAddressError}</div>
                                    </Form.Group> 
                                    <Form.Group controlId="abuseTypeOther">
                                            <Form.Label>Abuse Type Other</Form.Label>
                                            <Form.Control type="text"   name="abuseTypeOther" 
                                        value={abuseTypeOther} onChange={this.handlechange} autoComplete="off"/>
                                        <div style={{fontSize:12, color:"red"}}>
                                            {this.state.amountError}</div>
                                            <div className="formerror">
                                                {this.state.amountError}</div>
                                    </Form.Group>
                                    <Form.Group controlId="abuser">
                                            <Form.Label>Abuser</Form.Label>
                                            <Form.Control type="text"   name="abuser" 
                                        value={abuser} onChange={this.handlechange} autoComplete="off"/>
                                        <div style={{fontSize:12, color:"red"}}>
                                            {this.state.amountError}</div>
                                            <div className="formerror">
                                                {this.state.amountError}</div>
                                    </Form.Group>
                                    <div className="amount_date_div">
                                    <Form.Group controlId="fromCountryCode">
                                            <Form.Label>From Country Code</Form.Label>
                                            <Form.Control type="text"   name="fromCountryCode" 
                                        value={fromCountryCode} onChange={this.handlechange} autoComplete="off"/>
                                        <div style={{fontSize:12, color:"red"}}>
                                            {this.state.amountError}</div>
                                            <div className="formerror">
                                                {this.state.amountError}</div>
                                    </Form.Group>
                                    <Form.Group controlId="fromCountry">
                                            <Form.Label>From Country</Form.Label>
                                            <Form.Control type="text"   name="fromCountry" 
                                        value={fromCountry} onChange={this.handlechange} autoComplete="off"/>
                                        <div style={{fontSize:12, color:"red"}}>
                                            {this.state.amountError}</div>
                                            <div className="formerror">
                                                {this.state.amountError}</div>
                                    </Form.Group>
                                    </div> 
                                    <Form.Group controlId="type">
                                            <Form.Label>Type</Form.Label>
                                            <Form.Control type="text" name="type" 
                                        value={type} onChange={this.handlechange} autoComplete="off"/>
                                        <div style={{fontSize:12, color:"red"}}>
                                            {this.state.badgeidError}</div>
                                            <div className="formerror">
                                                {this.state.station_idError}</div>
                                    </Form.Group>  

                                    <Form.Group controlId="amount">
                                            <Form.Label>Amount</Form.Label>
                                            <Form.Control type="text" name="amount" 
                                        value={amount} onChange={this.handlechange} autoComplete="off"/>
                                        <div style={{fontSize:12, color:"red"}}>
                                            {this.state.amountError}</div>
                                            <div className="formerror">
                                                {this.state.amountError}</div>
                                    </Form.Group>  
                                    <Button className="btn btn-success shadow-2 mb-4" type="submit">Submit</Button> 
                                </form>
                                </div>
                            </Col>
                            {/* <Col md={6} sm={12} className="report_box">
                            <div className="report_box_inner">
                                <div className='tokan_img'>
                                    <img src='/assets/img/token.png' alt='token img'></img>
                                </div>
                                <div className='token_heading'>
                                    <h3>Start Token Save Sale Without Wasting Time</h3>
                                </div>
                                <div className='token_content'>
                                    <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                </div>
                                </div>
                            </Col>
                            <Col md={6} sm={12} className="report_box">
                                <div className="report_box_inner">
                                    <h3 className='people_heading'>People Reports</h3>
                                    <div className='reports_outer'>
                                        <div className='report_box report_up'>
                                            <img className='img_icon' src='/assets/img/Dogcoin.png' alt='img'></img>
                                            <div className='report_details'>
                                                <h4>Dogecoin</h4>
                                                <p>$0.31</p>
                                                <span className='value_report'>
                                                    $0.31 
                                                </span>
                                            </div>
                                            <img className='img_report' src='/assets/img/Rectangle.png' alt='img'></img>
                                        </div>
                                        <div className='report_box report_down'>
                                            <img className='img_icon' src='/assets/img/Bitcoin.png' alt='img'></img>
                                            <div className='report_details'>
                                                <h4>Dogecoin</h4>
                                                <p>$0.31</p>
                                                <span className='value_report'>
                                                    $0.31 
                                                </span>
                                            </div>
                                            <img className='img_report' src='/assets/img/Rectangle.png' alt='img'></img>
                                        </div>
                                        <div className='report_box report_up'>
                                            <img className='img_icon' src='/assets/img/Dogcoin.png' alt='img'></img>
                                            <div className='report_details'>
                                                <h4>Dogecoin</h4>
                                                <p>$0.31</p>
                                                <span className='value_report'>
                                                    $0.31 
                                                </span>
                                            </div>
                                            <img className='img_report' src='/assets/img/Rectangle.png' alt='img'></img>
                                        </div>
                                        <div className='report_box report_down'>
                                            <img className='img_icon' src='/assets/img/Bitcoin.png' alt='img'></img>
                                            <div className='report_details'>
                                                <h4>Dogecoin</h4>
                                                <p>$0.31</p>
                                                <span className='value_report'>
                                                    $0.31 
                                                </span>
                                            </div>
                                            <img className='img_report' src='/assets/img/Rectangle.png' alt='img'></img>
                                        </div>
                                        <div className='report_box report_up'>
                                            <img className='img_icon' src='/assets/img/Dogcoin.png' alt='img'></img>
                                            <div className='report_details'>
                                                <h4>Dogecoin</h4>
                                                <p>$0.31</p>
                                                <span className='value_report'>
                                                    $0.31 
                                                </span>
                                            </div>
                                            <img className='img_report' src='/assets/img/Rectangle.png' alt='img'></img>
                                        </div>
                                        <div className='report_box report_down'>
                                            <img className='img_icon' src='/assets/img/Bitcoin.png' alt='img'></img>
                                            <div className='report_details'>
                                                <h4>Dogecoin</h4>
                                                <p>$0.31</p>
                                                <span className='value_report'>
                                                    $0.31 
                                                </span>
                                            </div>
                                            <img className='img_report' src='/assets/img/Rectangle.png' alt='img'></img>
                                        </div>
                                        <div className='report_box report_up'>
                                            <img className='img_icon' src='/assets/img/Dogcoin.png' alt='img'></img>
                                            <div className='report_details'>
                                                <h4>Dogecoin</h4>
                                                <p>$0.31</p>
                                                <span className='value_report'>
                                                    $0.31 
                                                </span>
                                            </div>
                                            <img className='img_report' src='/assets/img/Rectangle.png' alt='img'></img>
                                        </div>
                                        <div className='report_box report_down'>
                                            <img className='img_icon' src='/assets/img/Bitcoin.png' alt='img'></img>
                                            <div className='report_details'>
                                                <h4>Dogecoin</h4>
                                                <p>$0.31</p>
                                                <span className='value_report'>
                                                    $0.31 
                                                </span>
                                            </div>
                                            <img className='img_report' src='/assets/img/Rectangle.png' alt='img'></img>
                                        </div>
                                    </div>
                                </div>
                            </Col> */}
                        </Row>
                    </Col>                     
                </Row>
            </div>
        </Aux>
        );
    }
}
export default Dashboard; 