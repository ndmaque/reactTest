import React from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import Paper from '@mui/material/Paper';

const TableList = (props) => {
    const { tableData } = props;
    //console.log('tablelist', tableData)

    const heading = tableData[0] ? tableData[0] : []
    //console.log('heading', Object.entries(heading)[0][0])

    return (

        <TableContainer component={Paper}>
            <Table aria-label="a table of data">
                <TableHead>
                    <TableRow>
                        {Object.entries(heading).map(([key, value]) => (
                            <TableCell key={key}>{key}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>


                <TableBody>
                    {tableData.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.first_name}</TableCell>
                            <TableCell>{row.last_name}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.phone}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    );
};

export default TableList;
