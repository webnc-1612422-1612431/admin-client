import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import swal from 'sweetalert';

import '../App.css';
import '../assets/js/plugins/nucleo/css/nucleo.css';
import '../assets/js/plugins/@fortawesome/fontawesome-free/css/all.min.css';
import '../assets/css/argon-dashboard.css';

import app from '../constants/firebaseCfg';
import { fetchAddMessage, fetchClearMessage } from '../actions/HandlerComplain';
import {fetchUpdateContract} from '../actions/Contracts';


class HandlerComplainView extends React.Component {
  constructor(props) {
    super(props);
    const {
      match,
      fetchAddMessageAction,
      fetchClearMessageAction
    } = this.props;
    fetchClearMessageAction();
    const { email1, email2 } = match.params;
    this.database = app.database().ref();
    this.database.on('value', (snap) => {
      snap.forEach((childNode) => {
        if (
          (childNode.val().metadata.u1 === email1 &&
            childNode.val().metadata.u2 === email2) ||
          (childNode.val().metadata.u2 === email1 &&
            childNode.val().metadata.u1 === email2)
        ) {
          app
            .database()
            .ref()
            .child(childNode.key)
            .child('message')
            .on('value', (snap1) => {
              snap1.forEach((childNode1) => {
                const message = {
                  text: childNode1.val().text,
                  time: childNode1.val().time,
                  sender: childNode1.val().sender
                };
                fetchAddMessageAction(message);
              });
            });
        }
      });
    });
  }

  hanleUpdateState = (id, state) => {
    const { fetchUpdateUserState, fetchListUsersAction } = this.props;
    const user = {
      id,
      state: state === 1 ? 0 : 1
    };
    Promise.resolve(fetchUpdateUserState(user)).then(() => {
      fetchListUsersAction();
    });
  };

  moneyForStudent = (e) => {
    e.preventDefault();
    swal({
        title: "Are you sure?",
        text: "",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("You have just send money to Student", {
            icon: "success",
          });
          const {fetchUpdateContractAction, match,history} = this.props;
          const {contractid} = match.params;
          Promise.resolve(fetchUpdateContractAction({id:contractid, ishandled: 1})).then(() => {
            history.push("/contracts");
          });
        }
      });
  };

  moneyForTeacher = (e) => {
    e.preventDefault();
    swal({
        title: "Are you sure?",
        text: "",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("You have just send money to Teacher", {
            icon: "success",
          });
          const {fetchUpdateContractAction, match, history} = this.props;
          const {contractid} = match.params;
          Promise.resolve(fetchUpdateContractAction({id:contractid, ishandled: 1})).then(() => {
            history.push("/contracts");
          });
        }
      });
  };

  render() {
    const { HandlerComplainState } = this.props;
    const { messages } = HandlerComplainState;

    const messagesContent = [];
    for (let i = 0; i < messages.length; i += 1) {
      messagesContent.push(
        <div>
          {messages[i].sender}:{messages[i].text}
        </div>
      );
    }

    return (
      <div className="main-content">
        <nav
          className="navbar navbar-top navbar-expand-md navbar-dark"
          id="navbar-main"
        >
          <div className="container-fluid">
            <a
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              href="/"
            >
              User information
            </a>
            <ul className="navbar-nav align-items-center d-none d-md-flex">
              <li className="nav-item dropdown">
                <a
                  className="nav-link pr-0"
                  href="/"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div className="media align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img alt="Placeholder" src="" />
                    </span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            height: '100px',
            backgroundImage: 'url(/profile-cover.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center top'
          }}
        >
          <span className="mask bg-gradient-default opacity-8" />
        </div>

        <div className="container-fluid mt--7">
          <div className="row">
            <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">
              <div className="card bg-secondary shadow">
                <div className="card-header bg-white border-0">
                  <div className="row align-items-center">
                    <div className="col-8">
                      <h3 className="mb-0">Infomation</h3>
                    </div>
                  </div>
                </div>
                <div style={{ height: '80vh' }} className="card-body">
                  <div>Teacher: {}</div>
                  <div>User: {}</div>
                  <div>Revenue: {}</div>
                  <div>Start time: {}</div>
                  <div>Finish time: {}</div>
                  <button
                    style={{ width: '100%', marginBottom: '10px' }}
                    className="btn btn-success"
                    type="button"
                    onClick={this.moneyForStudent.bind(this)}
                  >
                    Hoàn tiền cho học viên
                  </button>
                  <button
                    style={{ width: '100%', marginBottom: '10px' }}
                    className="btn btn-success"
                    type="button"
                    onClick={this.moneyForTeacher.bind(this)}
                  >
                    Thanh toán cho giáo viên
                  </button>
                </div>
              </div>
            </div>

            <div className="col-xl-8 order-xl-1">
              <div className="card bg-secondary shadow">
                <div className="card-header bg-white border-0">
                  <div className="row align-items-center">
                    <div className="col-8">
                      <h3 className="mb-0">Chat box</h3>
                    </div>
                  </div>
                </div>
                <div style={{ height: '80vh' }} className="card-body">
                  {messagesContent}
                </div>
              </div>
            </div>
          </div>
          <footer className="footer">
            <div className="row align-items-center justify-content-xl-between">
              <div className="col-xl-6">
                <div className="copyright text-center text-xl-left text-muted">
                  &copy; 2018{' '}
                  <a
                    href="https://www.creative-tim.com"
                    className="font-weight-bold ml-1"
                  >
                    Creative Tim
                  </a>
                </div>
              </div>
              <div className="col-xl-6">
                <ul className="nav nav-footer justify-content-center justify-content-xl-end">
                  <li className="nav-item">
                    <a href="https://www.creative-tim.com" className="nav-link">
                      Creative Tim
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="https://www.creative-tim.com/presentation"
                      className="nav-link"
                    >
                      About Us
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="http://blog.creative-tim.com" className="nav-link">
                      Blog
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md"
                      className="nav-link"
                    >
                      MIT License
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  AdminState: state.AdminReducer,
  HandlerComplainState: state.HandlerComplainReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      //   fetchUpdateUserState: updateUserState
      fetchAddMessageAction: fetchAddMessage,
      fetchClearMessageAction: fetchClearMessage,
      fetchUpdateContractAction:fetchUpdateContract 
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HandlerComplainView));
