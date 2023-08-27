import { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";


const socket = io.connect(process.env.REACT_APP_BACKEND_URI);

function App() {
  const [Username, setUsername] = useState("");
  const [Room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false)

  const joinRoom = () => {
    console.log("room id:" + Room);
    if (Username !== "" && Room !== "") {
      console.log("room id:" + Room);
      socket.emit("join_room", Room);
      setShowChat(true);
    }
  }

  const options = ['Software & IT', 'Government Sector', 'Law', 'Schooling', 'Commerce','Business','Textiles','Restaurents','Chefs','Real Estate','MBA','Engineering','Medical','CA','Just Fun' ];

  const onOptionChangeHandler = (event) => {
    setRoom(event.target.value)
  }
  return (
    <div className="App">
      {!showChat &&
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Join Chat</h5>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Username</label>
              <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Type your Username" onChange={(event) => { setUsername(event.target.value) }} />
            </div>
            {/* <div className="mb-3">
              <label htmlFor="exampleFormControlTextarea1" className="form-label">Room Id</label>
              <input className="form-control" id="exampleFormControlTextarea1" rows="3"
                onChange={(event) => { setRoom(event.target.value) }}
              ></input>
            </div> */}


            <div className="input-group mb-3">
              <select onChange={onOptionChangeHandler} className="form-select interest btn btn-outline-secondary" placeholder="hello" id="inputGroupSelect01">
                <option hidden className="interest btn btn-outline-secondary">Choose your area of interest...</option>
                {options.map((option, index) => {
                  return <option key={index} value={index}>
                    {option}
                  </option>
                })}
                {/* <option value="1" className="dropdown-item" href="#">Software and IT</option>
                <option value="2" className="dropdown-item" href="#">Law</option>
                <option value="3" className="dropdown-item" href="#">Government Sector</option>
                <option value="4" className="dropdown-item" href="#">School</option>
                <option value="5" className="dropdown-item" href="#">Commerce</option>
                <option value="6" className="dropdown-item" href="#">Business</option>
                <option value="7" className="dropdown-item" href="#">Textiles</option> */}
              </select>
            </div>


            <button href="#" onClick={joinRoom} className="join_button btn btn-primary">let's Chat</button>
          </div>
        </div>
      }

      {showChat &&
        <Chat Room={Room} Username={Username} socket={socket} />
      }
    </div>
  );
}

export default App;
