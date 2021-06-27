import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { Col, Row } from "react-bootstrap";


class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      userType: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email.toLowerCase(),
      password: this.state.password,
      password2: this.state.password2,
      userType: this.state.userType,
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;


    const options = [
     
     // { label: 'Dean', value: 'dean' },
     // { label: 'A R', value: 'a-r' },
      //{ label: 'HOD', value: 'hod' },
    
      { label: 'Manager', value: 'manager' },
      { label: 'Staff', value: 'staff' },
      
    ];


    return (
       <div  className="form-wrapper">
        <div className="container" class="w-75 p-3" style={{  margin:'auto'}}>
          <div className="card bg-light mb-3 text-dark">
            <div className="card-body">
          
            
              <div className="display-4 text-center"><h2 class="text-left"><b><i>Sign Up a Account</i></b></h2><hr/></div>
              <p className="lead text-center">
                Create user account
              </p>

              <form noValidate onSubmit={this.onSubmit}>
              <Row>
              <Col md="6">
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
              </Col>
              <Col md="6">
               
                <SelectListGroup
                  placeholder="Select User type"
                  name="userType"
                  value={this.state.userType}
                  onChange={this.onChange}
                  options={options}
                  error={errors.userType}
                  info=""
                />
            </Col>
            </Row>
                 <TextFieldGroup
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  
                />

            <Row>
              <Col md="6">
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
              </Col>
              <Col md="6">
                <TextFieldGroup
                  placeholder="Confirm Password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
              </Col>
            </Row>
                <input type="submit" className="btn btn-info btn-block mt-4" />
                <br/>

                <p className="forgot-password text-right"> Already registered <a href="/login">sign in?</a>
                </p>
              </form>
            </div>
            </div>
          </div>
        </div>
      
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
