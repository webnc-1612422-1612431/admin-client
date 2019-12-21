/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import swal from 'sweetalert';

import {
  fetchListSkills,
  fetchAddSkill,
  fetchUpdateSkillStatus,
  fetchUpdateSkillName,
  changePage
} from '../actions/Skills';


import '../App.css';
import '../assets/js/plugins/nucleo/css/nucleo.css';
import '../assets/js/plugins/@fortawesome/fontawesome-free/css/all.min.css';
import '../assets/css/argon-dashboard.css';

class SkillsView extends React.Component {
  constructor(props) {
    super(props);
    const { fetchListSkillsAction, AdminState, history } = this.props;
    const { user } = AdminState;
    if (user === null) {
      history.push('/');
    }
    fetchListSkillsAction();
  }

  addSkillSubmit = e => {
    e.preventDefault();
    const { fetchAddSkillAction } = this.props;
    const newSkill = e.target.newSkill.value;
    fetchAddSkillAction(newSkill);
    document.getElementById('newSkill').value = '';
  };

  handleEdit = (id, skill) => {
    swal(`Nhập tên mới cho kỹ năng: ${  skill}`, {
      content: "input",
    })
    .then((value) => {
      const {updateSkillNameAction, fetchListSkillsAction} = this.props;
      Promise.resolve(updateSkillNameAction(id, value)).then(res => {
        if (res) {
          fetchListSkillsAction();
          swal("Change skill name success");
        } else {
          swal("Change skill name fail");
        }
      });
    });
  };

  hanleUpdateState = (id, state) => {
    const { updateSkillStatusAction } = this.props;
    console.log(state);
    Promise.resolve(updateSkillStatusAction(id, state)).then(() => {
      const { fetchListSkillsAction } = this.props;
      fetchListSkillsAction();
    });
  };

  handleClickPage = page => {
    const { fetchChangePage } = this.props;
    fetchChangePage(page);
  };

  render() {
    const { SkillsState, AdminState } = this.props;
    const { user } = AdminState;
    const { skills, page } = SkillsState;
    const tableContent = [];
    const pagination = [];

    console.log(user);

    if (skills.length === 0) {
      this.end = 0;
    } else if (page === Math.floor(skills.length / 5)) {
      this.end = skills.length;
    } else {
      this.end = 5 * (page + 1);
    }

    for (let i = 5*page; i < this.end; i += 1) {
      tableContent.push(
        <tr>
          <th scope="row">{i + 1}</th>
          <td>
            <div className="media align-items-center">
              <div className="media-body">
                <span className="mb-0 text-sm">{skills[i].skill}</span>
              </div>
            </div>
          </td>
          <td>{100}</td>
          <td>{skills[i].state ? 'Active' : 'Inactive'}</td>
          <td>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.handleEdit.bind(
                this,
                skills[i].id,
                skills[i].skill
              )}
            >Edit</button>
            <button
            type="button"
              className="btn btn-danger"
              onClick={this.hanleUpdateState.bind(
                this,
                skills[i].id,
                skills[i].state
              )}
            >Remove</button>
          </td>
        </tr>
      );
    }

    for (let i = 0; i < skills.length / 5; i += 1) {
      pagination.push(
        <li className="page-item active">
          <button
            className="page-link"
            type="button"
            onClick={this.handleClickPage.bind(this, i)}
          >
            {i + 1}
          </button>
        </li>
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
              href="../index.html"
            >
              Skills
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
            <div className="col">
              <div className="card shadow">
                <div
                  className="card-header border-0"
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <span>
                    <h3 className="mb-0" style={{ alignSelf: 'center' }}>
                      Skills tables
                    </h3>
                  </span>

                  <span>
                    <form
                      onSubmit={this.addSkillSubmit}
                      style={{ display: 'flex' }}
                    >
                      <input
                        id="newSkill"
                        name="newSkill"
                        style={{
                          marginRight: '4px',
                          background: '#F6F9FC'
                        }}
                        className="form-control form-control-alternative"
                        type="text"
                        placeholder="Type a new skill name"
                      />
                      <button type="submit" className="btn btn-success">
                        Add skill
                      </button>
                    </form>
                  </span>
                </div>
                <div className="table-responsive">
                  <table className="table align-items-center table-flush">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Name</th>
                        <th scope="col">Used</th>
                        <th scope="col">Status</th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody> {tableContent}</tbody>
                  </table>
                </div>
                <div className="card-footer py-4">
                  <nav aria-label="...">
                    <ul className="pagination justify-content-end mb-0">
                      <li className="page-item disabled">
                        <a className="page-link" href="/" tabIndex="-1">
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </a>
                      </li>
                      {pagination}<li className="page-item">
                        <a className="page-link" href="/">
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
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
                      HCMUS
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
                      License
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </footer>
        </div>

        {/* Model */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  New message
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="recipient-name" className="col-form-label">
                      Recipient:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="recipient-name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message-text" className="col-form-label">
                      Message:
                    </label>
                    <textarea className="form-control" id="message-text" />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Send message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  SkillsState: state.SkillsReducer,
  AdminState: state.AdminReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchListSkillsAction: fetchListSkills,
      fetchAddSkillAction: fetchAddSkill,
      updateSkillStatusAction: fetchUpdateSkillStatus,
      updateSkillNameAction: fetchUpdateSkillName,
      fetchChangePage: changePage,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SkillsView));
