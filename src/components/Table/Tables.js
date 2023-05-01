import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';

import EditableCell from './EditableCell/EditableCell';
import { useEffect } from 'react';
import { getCities, getTypes } from 'components/Api/Api';
import { ColumnsTable } from './ColumsTable';
import Select from 'react-select';
import { nanoid } from 'nanoid';

const Tables = () => {
  const [cities, setCities] = useState([]);
  const [types, setTypes] = useState([]);
  const [data, setData] = useState([]);
  const [allPrice, setAllPrice] = useState('');
  const [allCity, setAllCity] = useState('');
  const [allType, setAllType] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const citiesData = await getCities();
        const typesData = await getTypes();
        setCities(citiesData);
        setTypes(typesData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleDeleteRow = id => {
    const newData = data.filter(item => item.id !== id);
    console.log(newData, 'newDataDelete');
    setData(newData);
  };

  const handleCopyRow = id => {
    // копіювання рядка та додавання його в кінець масиву даних
    const rowToCopy = data.find(row => row.id === id);
    const newData = [...data, { ...rowToCopy, id: data.length + 1 }];
    setData(newData);
  };

  const handleEditCell = (newValue, rowIndex, accessor) => {
    const newData = [...data];
    newData[rowIndex][accessor] = newValue;
    setData(newData);
    if (accessor === 'city') {
      setSelectedCity(null);
    }
  };

  const handleAddRow = () => {
    setData([
      ...data,
      {
        number: data.length + 1,
        id: `${nanoid()}`,
        city: '',
        type: '',
        price: null,
      },
    ]);
  };

  const handleAllCityChange = e => {
    const confirmed = window.confirm(
      'Are you sure you want to update all cities in the table?'
    );
    if (confirmed) {
      const newData = data.map(row => ({ ...row, city: e.value }));
      setData(newData);

      setAllCity(e);
    } else {
      setAllCity('');
    }
  };

  const handleAllTypeChange = e => {
    const confirmed = window.confirm(
      'Are you sure you want to update all types in the table?'
    );
    if (confirmed) {
      const newData = data.map(row => ({ ...row, type: e.value }));
      setData(newData);
      setAllType(e);
    } else {
      setAllType('');
    }
  };

  const handleAllPriceChange = event => {
    setAllPrice(event.target.value);
  };

  const handleAllPriceBlur = () => {
    const newData = data.map(row => ({ ...row, price: allPrice }));

    const confirmed = window.confirm(
      'Are you sure you want to update all prices in the table?'
    );

    if (confirmed) {
      setData(newData);
    } else {
      setAllPrice('');
    }
  };

  console.log(data);

  return (
    <>
      <button onClick={handleAddRow}>Add Row</button>
      <button>Save</button>
      <Table striped>
        <thead>
          <tr>
            {ColumnsTable.map(column => (
              <th key={column.Header + '_' + column.accessor}>
                {column.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>All</th>
            <th></th>
            <th>
              <input
                type="text"
                placeholder="Enter value"
                value={allPrice}
                onChange={handleAllPriceChange}
                onBlur={handleAllPriceBlur}
              />
            </th>
            <th>
              <Select
                options={cities.map(({ name }) => ({
                  value: name,
                  label: name,
                }))}
                onChange={handleAllCityChange}
                value={allCity}
                placeholder="Select a city"
              />
            </th>
            <th>
              <Select
                options={types.map(({ name }) => ({
                  value: name,
                  label: name,
                }))}
                onChange={handleAllTypeChange}
                placeholder="Select a type"
                value={allType}
              />
            </th>
            <th></th>
          </tr>

          {data.map(({ id, number, city, type, price }) => (
            <tr key={id}>
              <th>
                <input type="text" placeholder="Enter value" value={allPrice} />
              </th>
              <th>
                <Select
                  options={cities.map(({ name }) => ({
                    value: name,
                    label: name,
                  }))}
                  placeholder={!selectedCity ? 'Select a city' : ''}
                  value={selectedCity}
                  onChange={e => {
                    setSelectedCity(e);
                  }}
                />
              </th>
              <th>
              
                <Select
                  options={types.map(({ name }) => ({
                    value: name,
                    label: name,
                  }))}
                  placeholder=""
                  value={allType}
                />
                <EditableCell
                 
                  value={price}
                 
                />
              </th>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
export default Tables;
