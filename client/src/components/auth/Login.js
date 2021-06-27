import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
import {  ButtonToolbar, Modal,FormControl,InputGroup } from 'react-bootstrap';
import { BrowserRouter as Router, Switch,Redirect, Route, Link } from "react-router-dom";
import { Icon, InlineIcon } from '@iconify/react';
import emailIcon from '@iconify-icons/dashicons/email';
import lockIcon from '@iconify-icons/fa-solid/lock';
import Form from 'react-bootstrap/Form';
import { Col, Row } from "react-bootstrap";
import logo from "../../img/unilogo.png";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/feed');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/feed');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div class="content">
      <div  className="form-wrapper">
       <div class="card bg-light text-dark col-lg-10" style={{margin:'auto'}}>
      <div class="card-body">
      <Row className="justify-content-md-center">
         <Col md={6} xs={4}>
          <div class="container h-100">
            <div class="row h-100 justify-content-center align-items-center">
              <img src={logo} style={{width:"60%", height:"auto"}}/>
            </div>
          </div>
          </Col>
   
        <Col md={6} xs={8}>
        <div class="container" class="col-lg-10 col-md-10 col-sm-10">
        <div class="card  text-dark">
        <div class="card-body">
        <Form onSubmit={this.onSubmit}  autocomplete="off">
          <div class="text-center">
            <span>Don't have an account?</span>
               <Link to="/register"> Register. </Link>
                <br/> 
          </div>
           <br/>

        <div class="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="5em" height="5em" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
          </svg>
          <br/>
          <h2 text-align="center"><b><i>Log in to your Account</i></b></h2>
        </div>

             <hr/><br/>
            
        <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1"><Icon icon={emailIcon} /></InputGroup.Text>
            </InputGroup.Prepend>
                              
            <FormControl type="email" name="email" id="email" className="form-control"  className="col-md-6" className="alert alert-dark"
                 placeholder="Email Address"
                 aria-label="Email Address"
                 aria-describedby="basic-addon1"
                 value={this.state.email}
                 onChange={this.onChange}
                 error={errors.email}
            />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Prepend>
             <InputGroup.Text id="basic-addon1"><Icon icon={lockIcon} /></InputGroup.Text>
          </InputGroup.Prepend>
                    
          <FormControl type="password" id="password" name="password"   className="form-control" className="col-md-6" className="alert alert-dark"
              placeholder="Password"
              aria-label="Password"
              aria-describedby="basic-addon1"
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
          />
          </InputGroup>

           <input type="submit" text="Login" className="btn btn-info btn-block mt-4" />
        <br/>  <br/>
      </Form>    
      </div>
      </div>
      </div>
      </Col>
      </Row>
      </div>
      </div>
      </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);