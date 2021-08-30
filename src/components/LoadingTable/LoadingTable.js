import Skeleton from '@material-ui/lab/Skeleton';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { PRODUCT_TABLE_HEADER_DATA } from '../../constants/productConstants';

const LoadingTable = ({ rowCount }) => {
    const generateCells = () => {
        const cells = [];
        for (let count = 0; count < PRODUCT_TABLE_HEADER_DATA.length; count++) {
            cells.push(
                <TableCell key={count}>
                    <Skeleton height={25} animation="wave" />
                </TableCell>
            );
        }
        return cells;
    };

    const generateRows = () => {
        const rows = [];
        for (let count = 0; count < rowCount; count++) {
            rows.push(
                <TableRow key={count}>{generateCells()}</TableRow>
            );
        }
        return rows;
    };

    return (
        <>
            <TableContainer className="sb-table-container">
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {PRODUCT_TABLE_HEADER_DATA.map((column) => (
                                <TableCell
                                    key={column.id}
                                    colSpan={column.colSpan}
                                >
                                    <Skeleton height={25} />
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {generateRows()}
                    </TableBody>
                </Table>
            </TableContainer>
            <Skeleton style={{ position: 'absolute', right: '4.5rem' }} width="20%" height={25} />
        </>
    );
};

export default LoadingTable;