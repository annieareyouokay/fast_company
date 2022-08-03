import React, { useState } from "react";
import api from "./api"
import Users from "./components/users"
import SearchStatus from "./components/searchStatus";

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDelete = (id) => {
    setUsers(users.filter(user=>user._id !== id))
  }

  const handleToogleBookmark = (id) => {
    setUsers(users.map(user => {
      if (user._id === id) {
        user.bookmark = !user.bookmark;
        return user
      } else {
        return user
      }
    }));
  }

  if (!users.length) {
    return <SearchStatus length={users.length} />;
  }

  return <div><Users users={users} handleDelete={handleDelete} handleToogleBookmark={handleToogleBookmark}/></div>
}

export default App;