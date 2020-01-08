/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import '../assets/vendor/animate/animate.css';
import '../assets/vendor/css-hamburgers/hamburgers.min.css';
import '../assets/vendor/select2/select2.min.css';
import '../assets/css/util.css';
import '../assets/css/main.css';
import '../assets/css/chatStyle.css';

import { databaseCfg } from '../constants/firebaseCfg';
import { addChat, addBox, clearChat, clearBox } from '../actions/Chat';

const ls = require('localStorage');

// 2 cái này cần
let check = false;
let gMessageId;
class ChatView extends React.Component {
  constructor(props) {
    super(props);

    const { addBoxAction, clearBoxAction } = this.props;
    
    // myEmail: lấy email của mình
    const myEmail = JSON.parse(ls.getItem('user')).user.email;

    const database = databaseCfg.database().ref();
    database.on('value', snap => {
      clearBoxAction();
      snap.forEach(childNode => {
        if (childNode.val().metadata && childNode.val().metadata.u1 === myEmail) {
          const box = {
            peerEmail: childNode.val().metadata.u2,
            messageId: childNode.key
          };

          // Thêm message box (cột danh sách người nhắn tin bên trái).
          addBoxAction(box);
        } else if (childNode.val().metadata && childNode.val().metadata.u2 === myEmail) {
          const box = {
            peerEmail: childNode.val().metadata.u1,
            messageId: childNode.key
          };
          // Thêm message box (cột danh sách người nhắn tin bên trái).
          addBoxAction(box);
        }
      });
    });
  }

  findRoom = (email1, email2) => {
    const database = databaseCfg.database().ref();
    database.on('value', snap => {
      snap.forEach(childNode => {
        if (
          (childNode.val().metadata.u1 === email1 &&
            childNode.val().metadata.u2 === email2) ||
          (childNode.val().metadata.u1 === email2 &&
            childNode.val().metadata.u2 === email1)
        ) {
          check = true;
        }
      });
    });
  };

  // Tạo phòng
  // peerEmail: mail của thằng đối diện. Khi click tạo phòng
  createRoom = peerEmail => {
    const myEmail = JSON.parse(ls.getItem('user')).user.email;
    this.findRoom(myEmail, peerEmail);

    if (!check) {
      const { clearBoxAction, clearChatAction } = this.props;
      clearChatAction();
      clearBoxAction();
      const database = databaseCfg.database().ref();
      database
        .push()
        .set({
          metadata: {
            u1: myEmail,
            u2: peerEmail
          }
        })
        .then(id => {
          console.log(id);
        });
    }
  };

  // Gửi tin nhắn
  handleSendMessage = e => {
    e.preventDefault();
    // Lấy email của mình
    const myEmail = JSON.parse(ls.getItem('user')).user.email;

    // Lấy message từ ô nhập tin nhắn
    const msg = document.getElementById('message').value;
    databaseCfg
      .database()
      .ref(gMessageId)
      .child('message')
      .push()
      .set({ sender: myEmail, text: msg, time: Date.now() });
  };

  // Khi nhấn vào tin nhắn với ai đó (cột bên trái). thì lấy danh sách tin nhắn của nó bỏ vào cột bên phải
  handleGetMessage = messageId => {
    gMessageId = messageId;

    const { addChatAction } = this.props;
    const database = databaseCfg.database().ref();
    database.on('value', snap => {
      const { clearChatAction } = this.props;
      clearChatAction();
      snap.forEach(childNode => {
        if (childNode.key === messageId) {
          databaseCfg
            .database()
            .ref()
            .child(childNode.key)
            .child('message')
            .on('value', snap1 => {
              snap1.forEach(childNode1 => {
                const message = {
                  text: childNode1.val().text,
                  time: childNode1.val().time,
                  sender: childNode1.val().sender
                };
                addChatAction(message);
              });
            });
        }
      });
    });
  };

  render() {
    const messageBoxsContent = [];
    const messagesContent = [];

    const { ChatState } = this.props;
    const { messageBoxs, messages } = ChatState;

    for (let i = 0; i < messages.length; i += 1) {
      messagesContent.push(
        <div className="row no-gutters">
          <div className="chat-bubble chat-bubble--left">
            <div>{messages[i].sender}</div>
            <div>{messages[i].text}</div>
            <div>{messages[i].time}</div>
          </div>
        </div>
      );
    }

    for (let j = 0; j < messageBoxs.length; j += 1) {
      messageBoxsContent.push(
        <div
          className="friend-drawer friend-drawer--onhover"
          onClick={this.handleGetMessage.bind(this, messageBoxs[j].messageId)}
        >
          <div className="text">
            <h6>{messageBoxs[j].peerEmail}</h6>
            <p className="text-muted">Hi, wanna see something?</p>
          </div>
          <span className="time text-muted small">13:21</span>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="row no-gutters" style={{ height: '80vh' }}>
          <div className="col-md-4 border-right">
            <div className="settings-tray">
              <b>Chat Box</b>
            </div>
            <div style={{ height: '70vh', overflowY: 'scroll' }}>
              {messageBoxsContent}
            </div>
          </div>
          <div className="col-md-8" style={{ position: 'relative' }}>
            <div className="settings-tray">
              <div className="friend-drawer no-gutters friend-drawer--grey">
                Tran Ba Ngoc
              </div>
            </div>
            <div
              className="chat-panel"
              style={{ overflowY: 'scroll', height: '62vh' }}
            >
              {messagesContent}
              <div
                className="row"
                style={{ position: 'absolute', bottom: '0', width: '100%' }}
              >
                <div className="col-12">
                  <div className="chat-box-tray">
                    <input
                      type="text"
                      name="message"
                      id="message"
                      placeholder="Type your message here..."
                    />
                    <button
                      type="button"
                      onClick={this.handleSendMessage.bind(this)}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          style={{ float: 'right' }}
          type="button"
          onClick={this.createRoom.bind(this, 'alot1@gmail.com')}
        >
          createRoom
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ChatState: state.ChatReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addChatAction: addChat,
      addBoxAction: addBox,
      clearChatAction: clearChat,
      clearBoxAction: clearBox
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ChatView));
