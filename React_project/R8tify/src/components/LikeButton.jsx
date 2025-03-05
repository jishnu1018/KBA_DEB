import React, { useState } from "react";

const LikeButton = () => {
  const [likes, setLikes] = useState(0);

  return (
    <button
      onClick={() => setLikes(likes + 1)}
      className="flex items-center space-x-2 px-4 py-2  text-black text-lg font-semibold rounded-lg cursor-pointer"
    >
      👍 <span>{likes}</span>
    </button>
  );
};

export default LikeButton;
