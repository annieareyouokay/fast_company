import React from "react";

const words = ["человек тусанет", "человека тусанут", "человек тусанет"];

const SearchStatus = ({ length }) => {
  const getPhrase = (length) => {
    if (!length) {
      return "Никто не тусанет с тобой";
    }

    return `${
      words[
        length % 100 > 4 && length % 100 < 20
          ? 2
          : [2, 0, 1, 1, 1, 2][length % 10 < 5 ? Math.abs(length) % 10 : 5]
      ]
    } с тобой сегодня`;
  };

  return (
    <h1>
      <span
        className={`badge m-2 bg-${length === 0 ? "danger" : "primary"}`}
      >{`${length} ${getPhrase(length)}`}</span>
    </h1>
  );
};

export default SearchStatus;
