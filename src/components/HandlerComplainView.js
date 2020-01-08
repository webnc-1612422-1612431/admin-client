import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import swal from 'sweetalert';

import '../App.css';
import '../assets/js/plugins/nucleo/css/nucleo.css';
import '../assets/js/plugins/@fortawesome/fontawesome-free/css/all.min.css';
import '../assets/css/argon-dashboard.css';

import { fetchAddMessage, fetchClearMessage, fetchListMessages, fetchContractDetail } from '../actions/HandlerComplain';
import {fetchUpdateContract} from '../actions/Contracts';
import Footer from './layout/Footer';
import Header from './layout/Header';


class HandlerComplainView extends React.Component {
  constructor(props) {
    super(props);
    const user = localStorage.getItem('user');
    if (user === null) {
      window.location.href = '/login';
    }
    const {
      match,
      fetchClearMessageAction,
      fetchListMessagesAction,
      fetchContractDetailAction
    } = this.props;
    fetchClearMessageAction();
    const { email1, email2, id } = match.params;
    fetchListMessagesAction(email1, email2);
    fetchContractDetailAction(id);
  }

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
          const {id} = match.params;
          Promise.resolve(fetchUpdateContractAction({contractid: id, ishandled: 1, isSuccess: 0})).then(() => {
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
          const {id} = match.params;
          Promise.resolve(fetchUpdateContractAction({contractid: id, ishandled: 1, isSuccess: 1})).then(() => {
            history.push("/contracts");
          });
        }
      });
  };

  render() {
    const { HandlerComplainState } = this.props;
    const { messages, information, complains } = HandlerComplainState;

    const messagesContent = [];
    for (let i = 0; i < messages.length; i += 1) {
      
      if (messages[i].sender === messages[0].sender) {
        messagesContent.push(
          <div style={{marginBottom: '5px', textAlign: '-webkit-right'}}> 
            <div style={{fontSize:'13px'}}>{messages[i].sender}</div> 
            <div style={{border: 'solid #6f97d9 1px', borderRadius: '30px', padding: '4px 10px 4px 10px', color: 'white', background: '#6f97d9', width: 'fit-content'}}> {messages[i].text}</div>
          </div>
        );
      } else {
        messagesContent.push(
          <div style={{marginBottom: '5px', textAlign: '-webkit-left'}}> 
            <div style={{fontSize:'13px'}}>{messages[i].sender}</div> 
            <div style={{border: 'solid #6f97d9 1px', borderRadius: '30px', padding: '2px 10px 2px 10px', color: 'white', background: '#6f97d9', width: 'fit-content'}}> {messages[i].text}</div>
          </div>
        );
      }
    }

    const complainContent = [];
    for (let i = 0; i < complains.length; i+=1){
    complainContent.push(<div style={{display: 'flex'}}>{complains[i].content} 	
      {complains[i].ishandled? <div style={{color: 'green'}}>&#9679;</div>:<div style={{color: 'red'}}>&#9679;</div>}
    </div>);
    }

    return (
      <div className="main-content">
        
        <Header isDisplay={1}/>

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
                  <div><b>Teacher: </b>{information.teachername}</div>
                  <div><b>Student:</b> {information.studentname}</div>
                  <div><b>Revenue:</b> {information.revenue}</div>
                  <div><b>Start time:</b> {information.startdate.toString().substring(0,10)}</div>
                  <div><b>Finish time:</b> {information.enddate.toString().substring(0,10)}</div>
                  <hr/>
                  <div><b>Complain content</b></div>
                  {complainContent}
                  <hr/>
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
         <Footer/>
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
      fetchAddMessageAction: fetchAddMessage,
      fetchClearMessageAction: fetchClearMessage,
      fetchUpdateContractAction:fetchUpdateContract,
      fetchListMessagesAction: fetchListMessages,
      fetchContractDetailAction: fetchContractDetail
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HandlerComplainView));
