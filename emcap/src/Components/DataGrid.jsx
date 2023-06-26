import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

const VISIBLE_FIELDS = ['local_employee_id','name','local_grade','skill_group','city','billability','vertical_segment'];

export default function BasicExampleDataGrid() {
  const [userData, setUserData] = useState([]);

  function getUsers() {
    fetch('https://emcapg.azurewebsites.net/api/employees/').then((result) => {
      result.json().then((resp) => {
        const rows = resp.map((row, index) => ({
          ...row,
          id: index + 1,
        }));
        
        setUserData(rows);
      });
    });
  }

  useEffect(() => {
    getUsers();
  }, []);

  const columns = VISIBLE_FIELDS.map((field) => ({
    field,
    headerName: field,
    width: 150,
  }));

  return (
    <div>
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={userData} columns={columns} components={{ Toolbar: GridToolbar }} />
    </div>
    <div>

    </div>
    </div>
  );
}
