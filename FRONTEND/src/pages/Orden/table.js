import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const createHeader = (header) => {
    return (
        header.map((data, index) => (
            <TableCell style={{ minWidth: '230px' }} key={`thc-${index}`}>{data.headerName}</TableCell>
        ))
    )
};

const createBody = (
    rows,
    header,
    deleteRow
) => rows.map((data, index) => (
    <TableRow key={`tr-${index}`} selectable={"false"}>

        {CreateRow(data, header)}
        {deleteRowOfTable(data, index, deleteRow)}

    </TableRow>
));

const deleteRowOfTable = (data, index, deleteRow) => {
    return (
        <TableCell>
            <ArrowRightIcon onClick={() => deleteRow(data.id, index)} />
        </TableCell>
    )
};

const getTextRow = (data, cellData) => {
    if(cellData.prop==='hora'){
        const date = new Date(data);

        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }
    return String(data);
};

const CreateRow = (
    data,
    header
) => {
    return (
        header.map((cellData, keyData) =>
            <TableCell key={`trc-${keyData}`}>
                {
                    getTextRow(data[cellData.prop], cellData)
                }
            </TableCell>

        )
    )
}

export default function AcccessibleTable({
    header,
    rows,
    deleteRow
}) {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="caption table">
                <TableHead>
                    <TableRow>
                        {createHeader(header)}
                        <TableCell>{"SIGUIENTE PASO"}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        createBody(
                            rows,
                            header,
                            deleteRow
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}
