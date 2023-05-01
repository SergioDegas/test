import { useState } from 'react';

const EditableCell = ({ value, onUpdate }) => {
  const [edit, setEdit] = useState(false);
  const [newValue, setNewValue] = useState(value);

  const handleClick = () => {
    setEdit(true);
  };
  const handleKeyDown = e => {
    switch (e.key) {
      case 'Enter':
        onUpdate(newValue);
        setEdit(false);
        break;
      case 'Escape':
        setNewValue(value);
        setEdit(false);
        break;
      default:
        break;
    }
  };
  const handleChange = e => {
    setNewValue(e.target.value);
  };

    return (
      <>
        <th onClick={handleClick}>
          {edit ? (
            <input
              type="text"
              value={newValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          ) : (
            value
          )}
        </th>
      </>
    );
};
export default EditableCell;
