import React from "react";

const Card: React.FC = ({ children }) => (
  <div className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 px-2 my-2">
    <div className="flex flex-col shadow-md rounded px-4 py-2 hover:shadow-xl">
      {children}
    </div>
  </div>
);

export default Card;
