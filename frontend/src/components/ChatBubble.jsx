import React from 'react';
import '../static/ChatBubble.css';
// import PropTypes from 'prop-types';

const ChatBubble = ({ message, sender, username}) => {
  return (
    <div className={`chat-bubble ${sender === 'user' ? 'user' : 'other'} `}>
      <div className='senderName'>{username}</div>
      {message}
    </div>
  );
};

// ChatBubble.propTypes = {
//   message: PropTypes.string.isRequired,
//   sender: PropTypes.oneOf(['user', 'other']).isRequired,
// };

export default ChatBubble;
