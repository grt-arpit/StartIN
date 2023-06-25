import React, { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { MDBTextArea } from 'mdb-react-ui-kit';
import io from "socket.io-client";


const ChatInvestor = () => {
  const url = "http://localhost:5000";
  const [socket, setSocket] = useState(io(url, { autoConnect: false }));
  const [text, setText] = useState("");

  const [messageList, setMessageList] = useState([
    {text : 'hello', sent:true, created: new Date(), name: 'User 1'},
    {text : 'Hi', sent:false, created: new Date(), name: 'User 2'}
  ]);

  useEffect(() => {
    socket.connect();

  }, []);

  socket.on('recmsg', (data) => {
    setMessageList([ ...messageList, data ]);
  })

  const sendMessage = () => {
    let obj = {text : text, sent : true}
    socket.emit("sendmsg", obj);
    setMessageList([ ...messageList, obj ]);
  };

  const displayMessages = () => {
    return messageList.map( ({ text, sent, name }) => (
      <li className={"d-flex justify-content-between mb-4 "+(sent ? 'flex-row-reverse' : '')}>
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
              alt="avatar"
              className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
              width={60}
            />
            <div className="card mask-custom">
              <div
                className="card-header d-flex justify-content-between p-3"
                style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
              >
                <p className="fw-bold mb-0">{name}</p>
                <p className="text-light small mb-0">
                  <i className="far fa-clock" /> 12 mins ago
                </p>
              </div>
              <div className="card-body">
                <p className="mb-0">
                  {text}
                </p>
              </div>
            </div>
          </li>
    ) )
  }

  return (
    <div className="h-100 bg-light backgroundouter">
      <div className="container pt-5">
        <h2>Let's Start Chat</h2>
        <div className="card">
          <div className="card-body">
            <div className="chat-area backgroundinner">
              {displayMessages()}
            </div>
          </div>
          <div className="card-footer">
          <MDBTextArea label='Message' id='textAreaExample' rows={3} 
           onChange={(e) => setText(e.target.value)}
          />
          <Button 
                  type="submit"
                  onClick={sendMessage}
                  variant="contained"
                  sx={{ mt: 3}}
                >
                  Send Message
                </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInvestor;