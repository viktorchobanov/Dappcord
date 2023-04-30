import { useEffect, useState, useRef } from 'react'
import { io } from "socket.io-client"

// Assets
import person from '../assets/person.svg'
import send from '../assets/send.svg'

// Socket
const socket = io('ws://localhost:3030')

const Messages = ({ account, messages, currentChannel }) => {
  const [message, setMessage] = useState('')
  const [isConnected, setConnected] = useState(false)

  const messageEndRef = useRef(null)

  const sendMessage = async (e) => {
    e.preventDefault()

    console.log("sending" + message)
  }

  useEffect(() => {
    (currentChannel && account) ? setConnected(true) : setConnected(false)
  }, [account, currentChannel])

  return (
    <div className="text">
      <div className="messages">
        {currentChannel && messages.filter(message => message.channel === currentChannel.id.toString()).map((message, idx) => (
          <div className='message' key={idx}>
            <img src={person} alt={account} />
            <div className='message_content'>
              <h3>{message.account.slice(0, 6) + '...' + message.account.slice(38, 42)}</h3>
              <p>
                {message.text}
              </p>
            </div>
          </div>
        ))}

        <div ref={messageEndRef}></div>

      </div>

      <form onSubmit={sendMessage}>
        {isConnected ? (
          <input
            type='text'
            placeholder='Type your message here...'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        ) : (
          <input
            type='text'
            placeholder='Please connect first (Or join the channel)...'
            value={''}
            disabled
          />
        )}

        <button type='submit' disabled={!isConnected}>
          <img src={send} alt='Send Message' />
        </button>
      </form>
    </div>
  );
}

export default Messages;