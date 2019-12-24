import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

class Header extends React.Component {
  constructor(props) {
    super(props);
    console.log('');
  }

  render() {
    const { AdminState, pageName, isDisplay } = this.props;
    const { user } = AdminState;
    const added =[];
    console.log(this.props);


    if (isDisplay === 1) {
        added.push(<div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            height: '100px',
            backgroundImage: 'url(/profile-cover.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center top'
          }}
        >
          <span className="mask bg-gradient-default opacity-8" />
        </div>);
    }
    return (
      <div>
        <nav
          className="navbar navbar-top navbar-expand-md navbar-dark"
          id="navbar-main"
        >
          <div className="container-fluid">
            <a
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              href="../index.html"
            >
              {pageName}
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
                      <img alt="Placeholder" src={user.avatar} />
                    </span>
                    <div className="media-body ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm  font-weight-bold">
                        {user.fullname}
                      </span>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </nav>
        {added}
      </div>
      
    );
  }
}

const mapStateToProps = state => ({
  AdminState: state.AdminReducer
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header));
