import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';

import { addPost } from '../../actions/postActions';
import { addLeave } from '../../actions/leaveActions';

import DatePicker from 'react-date-picker';
import { Col, Row } from "react-bootstrap";



class LeaveForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      errors: {},
      applicantName: '',
      applicantUserType:'',
      reason: '',
      leaveType: null,
      isApproved: false,
      location:'',
      duration:'',
      institute: '',
      placeToVisit:'',

      dateTo: new Date(),
      dateFrom: new Date(),
      apointmentDate: new Date(),
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(newProps) {

  
    console.log(newProps.errors)

    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
      //alert("Leave falied")

    }


  

  }
  


  

  onSubmit(e) {
      console.log("submit", this.state)


      
    e.preventDefault();
    const { user } = this.props.auth;

    const newLeave = {
      applicantName: user.name,
      applicantUserType: user.userType,
      leaveType: this.state.leaveType,
      dateTo: this.state.dateTo,
      dateFrom: this.state.dateFrom,
      apointmentDate: this.state.apointmentDate,
      reason: this.state.reason,      
      isApproved: false,
      location:this.state.location,
      duration:this.state.duration,
      institute: this.state.institute,
      placeToVisit: this.state.placeToVisit,
      
    };

    this.props.addLeave(newLeave)
    
    

  }


 





  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
   
  }

  handleChange(date) {
    console.log(date)
    this.setState({
      startDate: date
    })
  }
  



  render() {
    const { errors } = this.state;

    const options = [
        { label: '* Select a Leave type', value: null },
        { label: 'Casual', value: 'casual' },
        { label: 'Anual', value: 'anual' },
        { label: 'Medical', value: 'medical' },
      ];


    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Request a New Leave...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">


              <SelectListGroup
                  placeholder="Select Leave type"
                  name="leaveType"
                  value={this.state.leaveType}
                  onChange={this.onChange}
                  options={options}
                  error={errors.leaveType}
                  info=""
                />
              <Row>
              <Col md="3">

<div> <div className="form-text text-muted">Date from</div>

    <DatePicker
    
    onChange={this.handleChange}
    value={this.state.dateFrom}
    />

</div>
</Col>
              <Col md="3">
            
                 <div> <div className="form-text text-muted">Date to</div>

                    <DatePicker className="form-text text-muted"
                    
                    onChange={this.handleChange}
                    value={this.state.dateTo}
                    
                    />

                </div>
              </Col>
              
              <Col md="3">


                <div> <div className="form-text text-muted">Appointment Date</div>

                    <DatePicker
                    
                    onChange={this.handleChange}
                    value={this.state.apointmentDate}
                    />

                </div> 

                </Col>
                </Row>                     
                <br/>
               
                <InputGroup
                  placeholder="Reason"
                  name="reason"
                  value={this.state.reason}
                  onChange={this.onChange}
                  error={errors.reason}
                />
                <InputGroup
                  placeholder="Name of Actor"
                  name="nameOfActor"
                  value={this.state.nameOfActor}
                  onChange={this.onChange}
                  error={errors.nameOfActor}
                />
               
                <InputGroup
                  placeholder="Actor Email"
                  name="actorEmail"
                  value={this.state.actorEmail}
                  onChange={this.onChange}
                  error={errors.actorEmail}
                />
                
                {this.state.leaveType === 'casual' && 
                    <div>
                        <InputGroup
                            placeholder="Location"
                            name="location"
                            value={this.state.location}
                            onChange={this.onChange}
                            error={errors.location}
                        />
                        <InputGroup
                            placeholder="Duration"
                            name="duration"
                            value={this.state.duration}
                            onChange={this.onChange}
                            error={errors.duration}
                        />
                    </div>
                }
                {this.state.leaveType === 'medical' && 
                    <div>
                        <InputGroup
                            placeholder="Institute"
                            name="institute"
                            value={this.state.institute}
                            onChange={this.onChange}
                            error={errors.text}
                        />
                    </div>
                }



                 {this.state.leaveType === 'anual' && 
                    <div>
                        <InputGroup
                            placeholder="placeToVisit"
                            name="placeToVisit"
                            value={this.state.placeToVisit}
                            onChange={this.onChange}
                            error={errors.placeToVisit}
                        />
                    </div>
                }




              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

LeaveForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addLeave })(LeaveForm);
