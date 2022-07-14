import React, { useState } from "react";
import api from "../api";
import "bootstrap/dist/css/bootstrap.css";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const [counter, setCounter] = useState(users.length);

  const handleDelete = (id) => {
    setUsers(prevState=>prevState.filter(user=>user._id !== id));
    setCounter(prevState=>prevState - 1);
  }
  
  const addDeleteButton = (id) => {
    return (<button className="btn btn-danger" onClick={() => handleDelete(id)}>Delete</button>);
  }

  const getBadgeClass = (badgeLevel) => {
    return `badge m-2 bg-${badgeLevel}`;
  }

  const getQualitiesElements = (qualities) => {
    return(qualities.map(
      (quality) => <span className={getBadgeClass(quality.color)}>{quality.name}</span>
    ))
  }

  const getPhrase = (count) => {   
    if (!count) {
      return "Никто не тусанет с тобой";
    }

    let result = " с тобой сегодня";
    if (count < 5 && count !== 1) {
      result = "человека тусанут" + result;
    } else {
      result = "человек тусанет" + result;
    }
    return result; 
  } 


  const renderLabel = (count, badgeLevel) => {
    return (
      <h1><span className={getBadgeClass(badgeLevel)}>{count} {getPhrase(count)}</span></h1>
    )    
  }

  const renderUsers = () => {
    return (users.map((user, index) => addUser(user, index)));
  }
  const addUser = ({_id, name, profession, qualities, completedMeetings, rate}, index) => {
    return (
      <>
      <tr>
        <th scope="row">{index + 1}</th>
        <td>{name}</td>
        <td>{profession.name}</td>
        <td>{getQualitiesElements(qualities)}</td>
        <td>{completedMeetings}</td>
        <td>{rate}</td>
        <td>{addDeleteButton(_id)}</td>
      </tr>
      </>
    ) 
  }

  return (
    !counter?
    <>{renderLabel(counter, "danger")}</> :
    <>
      {renderLabel(counter, "primary")}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Втретился,раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {renderUsers()}
        </tbody>
      </table>
    </>
  );
};

export default Users;
