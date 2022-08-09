import React from "react";
import SearchStatus from "./searchStatus";
import User from "./user";

const Users = ({ users, handleToogleBookmark, handleDelete}) => (
    <div>
      {<SearchStatus length={users.length} />}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Втретился,раз</th>
            <th scope="col">Оценка</th>
            <th scope="col">Избранное</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <User
              key={user._id}
              count={index}
              {...user}
              handleDelete={() => handleDelete(user._id)}
              handleToogleBookmark={() => handleToogleBookmark(user._id)}
            />
          ))}
        </tbody>
      </table>
    </div>  
);

export default Users;
