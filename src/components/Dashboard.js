import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const localStorage = require('localStorage');

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        const user = localStorage.getItem('user');
        console.log(user);
        if (user === null) {
            const {history} = this.props;
            history.push('/login');
        }
    }

    render() {
        return (<div className="main-content">Dashboard: Click Create new admin!</div>);
    }
};

export default connect(
    null,
    null
  )(withRouter(Dashboard));
  