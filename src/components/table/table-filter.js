import React, { createRef } from 'react';

import CustomInuptBase from '../input/custom-input-base';
import CustomSelectField from '../input/custom-select-field';
import PropTypes from 'prop-types';

const TableFilter = ({ column, onHandleFilterChange }) => {
  const input = createRef();

  const onChange = (event) => { onHandleFilterChange(column.field, event.target.value); };

  return (
    <div>
      {(column.lookup) 
        ? <CustomSelectField 
            field={column.field}
            lookup={column.lookup}
            filterValues={column.filterValue}
            onHandleFilterChange={onChange}
            width={column.width}
          />
        : <CustomInuptBase
            onChange={(event) => onChange(event)}
            size='small'
            type={column.type === 'numeric' ? 'number' : 'search'}
            defaultValue={column.filterValue ? column.type === 'numeric' ? parseInt(column.filterValue, 10) : column.filterValue : null}
            ref={input}
            variant='outlined'
            style={{width: column.width ? column.width : 100}}
          />
      }
    </div>
  );
};

TableFilter.propTypes = { 
  column: PropTypes.object.isRequired,
  onHandleFilterChange: PropTypes.func.isRequired
};

export default TableFilter;