import { useEffect, useState, useRef } from 'react'
import { io } from "socket.io-client"
import { Avatar } from './Avatar'

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

    const newMessage = {
      account,
      channel: currentChannel.id.toString(),
      text: message
    }

    if (message !== '')
      socket.emit('new message', newMessage)

    setMessage('')
  }

  // Scroll to the last message
  const scrollHandler = () => {
    setTimeout(() => {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }, 500)
  }

  useEffect(() => {
    scrollHandler()
  }, [])

  useEffect(() => {
    (currentChannel && account) ? setConnected(true) : setConnected(false)
  }, [account, currentChannel])

  return (
    <div className="text">
      <div className="messages">
        {currentChannel && messages.filter(message => message.channel === currentChannel.id.toString()).map((message, idx) => (
          <div className='message' key={idx}>
            <Avatar address={message.account} />
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