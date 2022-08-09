import React from "react";
import Bookmark from "./bookmark";
import Quality from "./quality"

const User = ({count, name, profession, qualities, bookmark, completedMeetings, rate, handleToogleBookmark, handleDelete}) => {
 
  return(
  <tr>
    <td>{count + 1}</td>
    <td>{name}</td>
    <td>{profession.name}</td>
    <td>{qualities.map(quality=><Quality
      key={quality._id}
      {...quality}
    />)}</td>
    <td>{completedMeetings}</td>
    <td>{rate}</td>
    <td>{<Bookmark bookmark={bookmark} handleToogleBookmark={handleToogleBookmark}/>}</td>
    <td><button className="btn btn-danger" onClick={handleDelete}>Delete</button></td>
  </tr>
  )
}

export default User;