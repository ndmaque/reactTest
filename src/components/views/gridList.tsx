import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid'; // , GridRowSelectionModel



export default function DataTable(props) {
  const { tableData } = props

  const dataOK = (tableData && tableData.length >0) 
  // return zilch if data is missing
  if (!dataOK) {console.log('No Data in gridlist') ;return ('')}

  const fields = Object.keys(tableData[0])

  const cols = fields.map((col) => {
      return { field: col, headerName: col.toUpperCase().replace('_', ' ') }; //, headerName: col.replace('_', ' ')
  });

  // const [rowSelectionModel, setRowSelectionModel] =  React.useState<GridRowSelectionModel>([]);

  const columns: GridColDef[] = cols
  //  const columns: GridColDef[] = [
  //   { field: 'id' },
  //   { field: 'firstName' },
  //   { field: 'lastName' },
  //   { field: 'age' },
  //   {
  //     field: 'fullName', sortable: false,
  //     valueGetter: (params: GridValueGetterParams) =>
  //       `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  //   },
  // ];

  // const xrows = [
  //   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  //   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  //   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  //   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  //   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  //   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  //   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  //   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  // ];
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        // rowSelectionModel={rowSelectionModel}
        

      />
    </div>
  );
}
