import { render, screen, within } from '../../../test/testUtils';
import { PRODUCT_TABLE_HEADER_DATA } from '../../constants/productConstants';

import LoadingTable from './LoadingTable';

describe('<LoadingTable />', () => {
    describe('render', () => {
        beforeEach(() => {
            render(<LoadingTable />);
        });

        it('shows correct number of loading skeletons for header', () => {
            const headerCells = screen.getAllByTestId('loading-table-heading-cell');

            expect(headerCells).toHaveLength(PRODUCT_TABLE_HEADER_DATA.length);
        });

        describe('table body', () => {
            let tableRows;

            beforeEach(() => {
                render(<LoadingTable rowCount={3} />);
                tableRows = screen.getAllByTestId('loading-table-body-row');
            });

            it('shows correct number of rows as that of passed through props', () => {
                expect(tableRows).toHaveLength(3);
            });
    
            it('each row has correct number of cells', () => {
                tableRows.forEach(row => {
                    expect(within(row).getAllByRole('cell')).toHaveLength(PRODUCT_TABLE_HEADER_DATA.length);
                });
            });
        });

        describe('loading pagination placeholder', () => {
            it('shows loading skeleton', () => {
                const paginationSkeleton = screen.getByTestId('loading-table-pagination');

                expect(paginationSkeleton).toBeInTheDocument();
            });
        });
    });
});
