import React, { useState, useEffect } from 'react';
import SearchStatus from '../../ui/searchStatus';
import Pagination from '../../common/pagination';
import GroupList from '../../common/groupList';
import UsersTable from '../../ui/usersTable';
import { paginate } from '../../../utils/paginate';
import _ from 'lodash';
import SearchField from '../../common/form/searchField';
import { useUsers } from '../../../../hooks/useUsers';
import { useProfessions } from '../../../../hooks/useProfessions';
import { useAuth } from '../../../../hooks/useAuth';

const UsersListPage = () => {
  const { isLoading: professionsLoading, professions } = useProfessions();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
  const [inputValue, setInputValue] = useState({ value: '' });
  const { users } = useUsers();
  const { currentUser } = useAuth();

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleClearFilter = () => {
    setSelectedProf(undefined);
  };

  const handleProfessionSelect = (item) => {
    setInputValue({ value: '' });
    setSelectedProf(item);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const handleChangeSearch = ({ target }) => {
    setSelectedProf(undefined);
    setInputValue({ value: target.value });
  };

  const handleToggleBookmark = (id) => {
    const newUsers = users.map((user) => {
      if (user._id === id) {
        user.bookmark = !user.bookmark;
        return user;
      } else {
        return user;
      }
    });
    console.log(newUsers);
    // setUsers(
    // );
  };
  const filterUsers = () => {
    let filteredUsers;
    if (selectedProf) {
      filteredUsers = users.filter(
        (user) => user.profession._id === selectedProf._id
      );
    } else if (inputValue.value) {
      const searchRegExp = new RegExp(
        `${inputValue.value.toLowerCase()}+`,
        'g'
      );
      filteredUsers = users.filter((user) =>
        searchRegExp.test(user.name.toLowerCase())
      );
    } else {
      filteredUsers = users;
    }

    return filteredUsers.filter(u => u._id !== currentUser._id);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };

  if (users) {
    const pageSize = 6;
    const filteredUsers = filterUsers();
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    if (!users.length) {
      return <SearchStatus length={users.length} />;
    }

    return (
      <div className="d-flex">
        {professions && !professionsLoading && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              items={professions}
              onItemSelect={handleProfessionSelect}
              selectedItem={selectedProf}
            />
            <button
              className="btn btn-primary mt-2"
              onClick={handleClearFilter}
            >
              Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus length={sortedUsers.length} />
          <div className="container">
            <div className="row">
              <form onSubmit={handleOnSubmit}>
                <SearchField
                  name="search"
                  placeholder="search"
                  value={inputValue.value}
                  onChange={handleChangeSearch}
                />
              </form>
            </div>
          </div>
          <UsersTable
            users={userCrop}
            handleToggleBookmark={handleToggleBookmark}
            onSort={handleSort}
            selectedSort={sortBy}
          />
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={sortedUsers.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return 'loading...';
  }
};

export default UsersListPage;
