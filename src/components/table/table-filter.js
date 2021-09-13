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
            filterValues={column.filterValue}
            lookup={column.lookup}
            onHandleFilterChange={onChange}
            width={column.width}
          />
        : <CustomInuptBase
            defaultValue={column.filterValue ? column.type === 'numeric' ? parseInt(column.filterValue, 10) : column.filterValue : null}
            onChange={(event) => onChange(event)}
            ref={input}
            size='small'
            style={{width: column.width ? column.width : 100}}
            type={column.type === 'numeric' ? 'number' : 'search'}
            variant='outlined'
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