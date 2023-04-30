const Channels = ({ provider, account, dappcord, channels, currentChannel, setCurrentChannel }) => {
  const channelHandler = async (channel) => {
    const hasJoined = await dappcord.hasJoined(channel.id, account)

    if (hasJoined) {
      console.log("Joined")
      setCurrentChannel(channel)
    } else {
      const signer = await provider.getSigner()
      const transactions = await dappcord.connect(signer).mint(channel.id, { value: channel.cost })
      await transactions.wait()
    }

  }


  return (
    <div className="channels">
      <div className="channels__text">
        <h2>Text Channels</h2>
        <ul>
          {
            channels && channels.map((channel, idx) => (
              <li
                key={idx}
                className={currentChannel && currentChannel.id.toString() === channel.id.toString() ? 'active' : ''}
                onClick={() => channelHandler(channel)}
              >{channel.name}</li>
            ))
          }
        </ul>
      </div>

      <div className="channels__voice">
        <h2>Voice Channels</h2>

        <ul>
          {/* to do */}
        </ul>
      </div>
    </div>
  );
}

export default Channels;