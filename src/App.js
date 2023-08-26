import { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";


const socket = io.connect(process.env.REACT_APP_BACKEND_URI);

function App() {
  const [Username, setUsername] = useState("");
  const [Room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false)
  const joinRoom = () => {
    if (Username !== "" && Room !== "") {
      socket.emit("join_room", Room);
      setShowChat(true);
    }
  }

  return (
    <div className="App">
      {!showChat&&
      <div className="card">
          <div className="card-body">
            <h5 className="card-title">Join Chat</h5>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Username</label>
              <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Type your Username" onChange={(event) => { setUsername(event.target.value) }}/>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlTextarea1" className="form-label">Room Id</label>
              <input className="form-control" id="exampleFormControlTextarea1" rows="3"
              onChange={(event) => { setRoom(event.target.value) }}
              ></input>
            </div>
            <button href="#" onClick={joinRoom} className="join_button btn btn-primary">let's Chat</button>
          </div>
      </div>
}
 
      {showChat&&
      <Chat Room={Room} Username={Username} socket={socket} />
      }
    </div>
  );
}

export default App;
