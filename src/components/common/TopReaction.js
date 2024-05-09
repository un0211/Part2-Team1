import React from 'react';

function TopReaction({ topReactions }) {
  return (
    <div className="reactionBox">
      {topReactions.map((reaction, index) => (
        <div key={index}>
          {reaction.emoji} {reaction.count}
        </div>
      ))}
    </div>
  );
}

export default TopReaction;
