import React from 'react';
import TableBody from './tableBody';
import TableHeader from './tableHeader';
import PropTypes from 'prop-types';

const Table = ({ onSort, selectedSort, columns, data, children }) => {
  return (
    <table className="table">
      {children || (
        <>
          <TableHeader
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
          />
          <TableBody columns={columns} data={data} />
        </>
      )}
    </table>
  );
};

Table.propTypes = {
  onSort: PropTypes.func,
  selectedSort: PropTypes.object,
  columns: PropTypes.object,
  data: PropTypes.array,
  children: PropTypes.array
};
export default Table;
