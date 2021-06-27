import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import LeaveForm from './LeaveForm';
import LeaveFeed from './LeaveFeed'
import { getLeaves, getAllLeaves } from '../../actions/leaveActions';

class Posts extends Component {
  componentDidMount() {
    const { user } = this.props.auth;
    this.props.getLeaves(user.id);
  }

  render() {
    const { posts, loading } = this.props.post;
    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <LeaveFeed />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <LeaveForm/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

export default connect(mapStateToProps, { getLeaves })(Posts);
