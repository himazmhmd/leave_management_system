import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { BrowserRouter as Router, Switch,Redirect, Route, Link ,withRouter } from "react-router-dom";
import { deletePost, addLike, onUnlikeClick, removeLike, approveLeave , disapproveLeave , getLeave } from '../../actions/postActions';

import { Col, Row } from "react-bootstrap";

class PostItem extends Component {
  constructor(props) {
    super(props);



    //console.log(this.props)
}

  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onPrintCLick(id) {
    //this.props.deletePost(id);
    //const { auth} = this.props;
    //this.props.getLeave(id);
    
    //const { history } = this.props;

    //console.log("test Leave ID");

    //  this.props.history.push( 
    //    {pathname: "/create-pdf",  state: { leaveId:id}}
    //  );
    this.setState({ post: this.props.post });
    console.log(this.props.post)

    // const newTo = { 
    //   pathname: "/create-pdf/:id", 
    //   param1: "Par1" 
    // };


    window.location = "/leave/"+ id
  }

 
  onClickApprove = (id) => {
    const { auth} = this.props;
    console.log(id)
    this.props.approveLeave(id, auth.user.userType)
  }


  onClickDisapprove = (id) => {
    const { auth} = this.props;
    console.log(id)
    this.props.disapproveLeave(id, auth.user.userType)
  }

  // findUserLike(likes) {
  //   const { auth } = this.props;
  //   if (likes.filter(like => like.user === auth.user.id).length > 0) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  render() {
    const { post, auth, showActions } = this.props;

    //console.log("post", post)

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              {/* <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""
              /> */}
            </a>
            <br />
            
          </div>
          <div className="col-md-10">
            

            <Row style={{"marginTop":"5px"}}>
            <Col sm={4} style={{ "margin":"10px"}}>
            <h6 className="lead">Applicant Name:</h6>
            </Col>
            <Col sm={6} style={{"backgroundColor": "#b0bec5", "padding":"5px", "borderRadius":"3px", "margin":"10px"}}>
            <h6>{post.applicantName}</h6>
            </Col>
            </Row>

            <Row style={{"marginTop":"5px"}}>
            <Col sm={4} style={{ "margin":"10px"}}>
            <h6 className="lead">Applicant Type :</h6>
            </Col>
            <Col sm={6} style={{"backgroundColor": "#b0bec5", "padding":"5px", "borderRadius":"3px", "margin":"10px"}}>
            <h6>{post.applicantUserType}</h6>
            </Col>
            </Row>



            <Row style={{"marginTop":"5px"}}>
            <Col sm={4} style={{ "margin":"10px"}}>
            <h6 className="lead">Reason :</h6>
            </Col>
            <Col sm={6} style={{"backgroundColor": "#b0bec5", "padding":"5px", "borderRadius":"3px", "margin":"10px"}}>
            <h6>{post.reason}</h6>
            </Col>
            </Row>

           
            
            <Row style={{"marginTop":"5px"}}>
            <Col sm={4} style={{ "margin":"10px"}}>
            <h6 className="lead">leave type : </h6>
            </Col>
            <Col sm={6} style={{"backgroundColor": "#b0bec5", "padding":"5px", "borderRadius":"3px", "margin":"10px"}}>
            <h6>{post.leaveType}</h6>
            </Col>
            </Row>
            
            
            
            <Row style={{"marginTop":"5px"}}>
            <Col sm={4} style={{ "margin":"10px"}}>
            <h6 className="lead">Approval : </h6>
            </Col>
            <Col sm={6} style={{"backgroundColor": "#b0bec5", "padding":"5px", "borderRadius":"3px", "margin":"10px"}}>
            <h6>{post.isApproved.toString()}</h6>
            </Col>
            </Row>
            
            
            
            {post.duration !== "" && 
                    <Row style={{"marginTop":"5px"}}>
                    <Col sm={4} style={{ "margin":"10px"}}>
                    <h6 className="lead">Duration : </h6>
                    </Col>
                    <Col sm={6} style={{"backgroundColor": "#b0bec5", "padding":"5px", "borderRadius":"3px", "margin":"10px"}}>
                    <h6>{post.duration}</h6>
                    </Col>
                    </Row>
                    
                  }


            {post.location !== "" && 
                   <Row style={{"marginTop":"5px"}}>
                   <Col sm={4} style={{ "margin":"10px"}}>
                   <h6 className="lead">Location to : </h6>
                   </Col>
                   <Col sm={6} style={{"backgroundColor": "#b0bec5", "padding":"5px", "borderRadius":"3px", "margin":"10px"}}>
                   <h6>{post.location}</h6>
                   </Col>
                   </Row>
                    
                  }



             {post.institute !== "" && 
                    <Row style={{"marginTop":"5px"}}>
                    <Col sm={4} style={{ "margin":"10px"}}>
                    <h6 className="lead">Institute : </h6>
                    </Col>
                    <Col sm={6} style={{"backgroundColor": "#b0bec5", "padding":"5px", "borderRadius":"3px", "margin":"10px"}}>
                    <h6>{post.institute}</h6>
                    </Col>
                    </Row>
                    
                  }

               {post.placeToVisit !== "" && 
                    <Row style={{"marginTop":"5px"}}>
                    <Col sm={4} style={{ "margin":"10px"}}>
                    <h6 className="lead">Place to Visit : </h6>
                    </Col>
                    <Col sm={6} style={{"backgroundColor": "#b0bec5", "padding":"5px", "borderRadius":"3px", "margin":"10px"}}>
                    <h6>{post.placeToVisit}</h6>
                    </Col>
                    </Row>
                    
                  }



            
            {showActions ? (
              <span>
                
                
                

                 
                  {auth.user.userType === 'hod' && 
                    <button
                      onClick={this.onClickApprove.bind(this, post._id)}
                      type="button"
                      style={{"backgroundColor": "#546e7a", "padding":"5px", "borderRadius":"3px","width":"100px", "float":"right", "margin":"10px" }}> 
                     
                        Approve
                    </button>
                  }

                  {auth.user.userType === 'hod' && 
                    <button
                      onClick={this.onClickDisapprove.bind(this, post._id)}
                      type="button"
                      style={{"backgroundColor": "#546e7a", "padding":"5px", "borderRadius":"3px","width":"100px", "float":"right", "margin":"10px" }}> 
                      <i className="fas fa-times" />
                        Decline
                    </button>
                  }




                {post.user === auth.user.id ? (

                  <button
                    onClick={this.onDeleteClick.bind(this, post._id)}
                    type="button"
                    style={{"backgroundColor": "#bf360c", "padding":"5px", "borderRadius":"3px","width":"250px", "float":"right", "margin":"10px" }}
                  > 
                      Delete Leave Aplication
                  </button>
                ) : null}


                
                { post.isDeanApproved && post.isARApproved && post.isHODApproved  && post.user === auth.user.id  ? (

                  <button

                  
                    onClick={this.onPrintCLick.bind(this, post._id)}
                    type="button"
                    style={{"backgroundColor": "#546e7a", "padding":"5px", "borderRadius":"3px","width":"100px", "float":"right", "margin":"10px" }}
                  > 
                      Print PDF
                  </button>
                  ) : null
                
                }

              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
  
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike, approveLeave,disapproveLeave  , getLeave,})(
  PostItem
);
