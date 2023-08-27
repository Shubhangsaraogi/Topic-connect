import { css } from '@emotion/css';
import { getByPlaceholderText } from '@testing-library/react';
import React, { useMemo, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom';


const Chat = ({ socket, Username, Room }) => {
    const [message, setMessage] = useState("")
    const [messageList, setMessageList] = useState([]);
    const sendMessage = async () => {
        if (message !== "") {
            const chatData = {
                message: message,
                Room: Room,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
                author: Username
            };
            setMessage("");
            await socket.emit("send_message", chatData);
            setMessageList((list) => [...list, chatData]);
        }
    };
    useMemo(() => {
        socket.on("received_message", (data) => {
            setMessageList((list) => [...list, data]);
            console.log(messageList)
        });
    }, [socket]);

    const ROOT_CSS = css({
        height: 600,
        
      });
    return (
        <>
            <div className="chat-container">
<ScrollToBottom className={ROOT_CSS}>
                <ul className='chat'>

                        {messageList.map((messageContent, index) => {
                            return (
                            <li key={index} className={`message ${Username===messageContent.author?"right":"left"}`}>
                                {/* <img className="logo" src="https://randomuser.me/api/portraits/women/17.jpg" alt="" /> */}
                                <div className='text-break message-content' >{messageContent.message}</div>
                                <div className="logo author">{messageContent.author}</div>
                                <div className="time">{messageContent.time}</div>
                            </li>
                            )
                        })}
                </ul>
</ScrollToBottom>
                    <div className="sendmessage">
                        <input 
                        onKeyDown={(event)=>{
                            event.key==="Enter"&&sendMessage();
                        }}
                        type="text"
                        value={message}
                        className="text_input"
                        placeholder="Type your message"
                        
                        onChange={(event) => { setMessage(event.target.value) }}
                        
                        />
                        <button onClick={sendMessage} className='text_input send_button'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
</svg>
                        </button>
                    </div> 
            </div>
                        
        </>

    )
}

export default Chat
