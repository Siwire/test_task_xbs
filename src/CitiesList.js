import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export function CitiesList(props) {
    const useStyles = makeStyles({
        table: {
            backgroundColor: '#999999'
        },
        container: {
            maxHeight: 300,
        },
        top: {
            backgroundColor: '#777777'
        }
    });
    const classes = useStyles();
    return (
        <TableContainer className={classes.container} component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead className={classes.top}>
                    <TableRow>
                        <TableCell align="left">City</TableCell>
                        <TableCell align="left">State</TableCell>
                        <TableCell align="left">Latitude</TableCell>
                        <TableCell align="left">Longitude</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.map(city => (
                        <TableRow key={city.id}>
                            <TableCell align="left">{city.city}</TableCell>
                            <TableCell align="left">{city.state}</TableCell>
                            <TableCell align="left">{city.latitude}</TableCell>
                            <TableCell align="left">{city.longitude}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
