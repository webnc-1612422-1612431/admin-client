import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import "../assets/vendor/bootstrap/css/bootstrap.min.css";
import "../assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "../assets/vendor/animate/animate.css";
import "../assets/vendor/css-hamburgers/hamburgers.min.css";
import "../assets/vendor/select2/select2.min.css";
import "../assets/css/util.css";
import "../assets/css/main.css";
import fetchLoginAction from '../actions/Login';

class LoginView extends React.Component {

  constructor(props) {
    super(props);
    const { AdminState, history } = this.props;
    const { user } = AdminState;
    if (user !== null) {
      history.push('/dashboard');
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { fetchLogin, history } = this.props;
    Promise.resolve(
      fetchLogin(e.target.email.value, e.target.password.value)
    ).then(isLogin => {
      if (isLogin) {
        history.push('/dashboard');
      }
    });
  };

  render() {
    return (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100" style={{ padding: '100px 130px' }}>
            <div className="login100-pic js-tilt" data-tilt>
              <img src="logo.png" style={{ padding: '40px 40px' }} alt="IMG" />
            </div>

            <form className="login100-form validate-form" onSubmit={this.handleSubmit}>
              <span className="login100-form-title">
                Admin Login
            </span>

              <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                <input className="input100" type="text" name="email" placeholder="Email" />
                <span className="focus-input  100"/>
                <span className="symbol-input100">
                  <i className="fa fa-envelope" aria-hidden="true"/>
                </span>
              </div>

              <div className="wrap-input100 validate-input" data-validate="Password is required">
                <input className="input100" type="password" name="password" placeholder="Password" />
                <span className="focus-input100"/>
                <span className="symbol-input100">
                  <i className="fa fa-lock" aria-hidden="true"/>
                </span>
              </div>

              <div className="container-login100-form-btn">
                <button type="submit" className="login100-form-btn">
                  Login
              </button>
              </div>

              <div className="text-center p-t-12">
                <a className="txt2" href="https://userclient-422-431.herokuapp.com/forgot-pass">
                  Forgot Username / Password?
              </a>
              </div>
            </form>
          </div>
        </div>
      </div>

    );
  }
}

const mapStateToProps = state => ({
  AdminState: state.AdminReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchLogin: fetchLoginAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoginView));