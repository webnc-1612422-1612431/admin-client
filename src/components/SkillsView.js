/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import swal from 'sweetalert';

import Header from './layout/Header';

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
import Footer from './layout/Footer';

class SkillsView extends React.Component {
  constructor(props) {
    super(props);
    const user = localStorage.getItem('user');
    if (user === null) {
      window.location.href = '/login';
    }
    const { fetchListSkillsAction } = this.props;
    fetchListSkillsAction();
  }

  addSkillSubmit = e => {
    e.preventDefault();
    const { fetchAddSkillAction } = this.props;
    const newSkill = e.target.newSkill.value;
    Promise.resolve(fetchAddSkillAction(newSkill)).then(res => {
      if (res) {
        swal('Add skill success');
      } else {
        swal('Add skill fail');
      }
    });
    document.getElementById('newSkill').value = '';
  };

  handleEdit = (id, skill) => {
    swal(`Nhập tên mới cho kỹ năng: ${skill}`, {
      content: 'input'
    }).then(value => {
      if (value === '') {
        swal('Change skill name fail');
      } else {
        const { updateSkillNameAction, fetchListSkillsAction } = this.props;
        Promise.resolve(updateSkillNameAction(id, value)).then(res => {
          if (res) {
            fetchListSkillsAction();
            swal('Change skill name success');
          } else {
            swal('Change skill name fail');
          }
        });
      }
    });
  };

  hanleUpdateState = (id, state) => {
    const { updateSkillStatusAction } = this.props;
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
    const { SkillsState } = this.props;
    const { skills, page } = SkillsState;
    const tableContent = [];
    const pagination = [];

    if (skills.length === 0) {
      this.end = 0;
    } else if (page === Math.floor(skills.length / 5)) {
      this.end = skills.length;
    } else {
      this.end = 5 * (page + 1);
    }

    for (let i = 5 * page; i < this.end; i += 1) {
      tableContent.push(
        <tr>
          <th scope="row">{i + 1}</th>
          <td style={{width:'30%'}}>
            <div className="media align-items-center">
              <div className="media-body">
                <span className="mb-0 text-sm">{skills[i].skill}</span>
              </div>
            </div>
          </td>
          <td style={{width:'20%'}}>{skills[i].used}</td>
          <td style={{width:'20%'}}>{skills[i].state ? 'Active' : 'Inactive'}</td>
          <td style={{width:'30%'}}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.handleEdit.bind(
                this,
                skills[i].id,
                skills[i].skill
              )}
            >
              Rename
            </button>

            {skills[i].state ? (
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.hanleUpdateState.bind(
                  this,
                  skills[i].id,
                  skills[i].state
                )}
                style={{ width: '100px' }}
              >
                Inactive
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-success"
                onClick={this.hanleUpdateState.bind(
                  this,
                  skills[i].id,
                  skills[i].state
                )}
                style={{ width: '100px' }}
              >
                Active
              </button>
            )}
          </td>
        </tr>
      );
    }

    for (let i = 0; i < skills.length / 5; i += 1) {
      if (i === page) {
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
      } else {
        pagination.push(
          <li className="page-item">
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
    }

    return (
      <div className="main-content">
        <Header isDisplay={1} />

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
                      {pagination}
                      <li className="page-item">
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
          <Footer />
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
      fetchChangePage: changePage
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SkillsView));
