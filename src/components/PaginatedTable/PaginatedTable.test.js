import userEvent from "@testing-library/user-event";
import axios from "axios";
import { act, findByText, render, screen, waitForElementToBeRemoved, within } from "../../../test/testUtils";
import PaginatedTable from "./PaginatedTable";

describe('<PaginatedTable />', () => {
    describe('heading', () => {
        beforeEach(() => {
            render(<PaginatedTable />);
        });

        it('displays table heading', () => {
            const tableHeading = screen.getByText('Products');

            expect(tableHeading).toBeInTheDocument();
        });

        it('displays add product button', () => {
            const addProductBtn = screen.getByText(/add product/i);

            expect(addProductBtn).toBeInTheDocument();
        });
    });

    describe('table', () => {
        beforeEach(() => {
        });

        it('shows loading table when products are not yet loaded', async () => {
            render(<PaginatedTable />, {
                preloadedState: {
                    products: {
                        loading: 'pending',
                    },
                },
            });
            const loadingTable = await screen.findByTestId(/table-loading/i);

            expect(loadingTable).toBeInTheDocument();
        });

        it('shows error when products fail to load', async () => {
            render(<PaginatedTable />, {
                preloadedState: {
                    products: {
                        loading: 'idle',
                        loadingError: { apiError: 'Something went wrong' },
                    },
                },
            });

            const error = await screen.findByText(/something went wrong/i);

            expect(error).toBeInTheDocument();
        });

        describe('products are loaded successfully', () => {
            it('shows table when products are loaded successfully', () => {
                render(<PaginatedTable />, {
                    preloadedState: {
                        products: {
                            loading: 'idle',
                        },
                    },
                });
                const table = screen.getByTestId(/table-container/i);

                expect(table).toBeInTheDocument();
            });

            describe('table head', () => {
                beforeEach(() => {
                    render(<PaginatedTable />, {
                        preloadedState: {
                            products: {
                                loading: 'idle',
                            },
                        },
                    });
                });

                it('shows Sr No column', () => {
                    const srNoCol = screen.getByText(/sr. no./i);

                    expect(srNoCol).toBeInTheDocument();
                });

                it('shows Name column', () => {
                    const nameCol = screen.getByText(/name/i);

                    expect(nameCol).toBeInTheDocument();
                });

                it('shows Manufacturer column', () => {
                    const manufacturerCol = screen.getByText(/manufacturer/i);

                    expect(manufacturerCol).toBeInTheDocument();
                });

                it('shows Price column', () => {
                    const priceCol = screen.getByText(/price/i);

                    expect(priceCol).toBeInTheDocument();
                });

                it('shows Description column', () => {
                    const descriptionCol = screen.getByText(/description/i);

                    expect(descriptionCol).toBeInTheDocument();
                });

                it('shows Actions column', () => {
                    const actionsCol = screen.getByText(/actions/i);

                    expect(actionsCol).toBeInTheDocument();
                });
            });

            describe('table body', () => {
                describe('no products are available', () => {
                    it('displays a message when no products are available', () => {
                        render(<PaginatedTable />, {
                            preloadedState: {
                                products: {
                                    loading: 'idle',
                                    products: [],
                                },
                            },
                        });
                        const unavailabilityMesssage = screen.getByText(/no products available/i);

                        expect(unavailabilityMesssage).toBeInTheDocument();
                    });
                });

                describe('products are available', () => {
                    const products = [
                        {
                            id: 'unique #1',
                            name: 'p1',
                            manufacturer: 'm1',
                            price: 100,
                            description: 'd1',
                        },
                        {
                            id: 'unique #2',
                            name: 'p2',
                            manufacturer: 'm2',
                            price: 200,
                            description: 'd2',
                        },
                    ];

                    beforeEach(() => {
                        render(<PaginatedTable />, {
                            preloadedState: {
                                products: {
                                    loading: 'idle',
                                    products,
                                },
                            },
                        });
                    });

                    describe('row 1', () => {
                        let utils;

                        beforeEach(() => {
                            const row = screen.getByRole('cell', { name: 'p1' }).closest('tr');
                            utils = within(row);
                        });

                        it('displays correct Sr No', () => {
                            const srNo = utils.getByText('1');

                            expect(srNo).toBeInTheDocument();
                        });

                        it('displays correct name', () => {
                            const name = utils.getByText('p1');

                            expect(name).toBeInTheDocument();
                        });

                        it('displays correct manufacturer', () => {
                            const manufacturer = utils.getByText('m1');

                            expect(manufacturer).toBeInTheDocument();
                        });

                        it('displays correct price', () => {
                            const price = utils.getByText('100');

                            expect(price).toBeInTheDocument();
                        });

                        it('displays correct description', () => {
                            const description = utils.getByText('d1');

                            expect(description).toBeInTheDocument();
                        });

                        describe('correct action icons', () => {
                            it('displays edit icon', () => {
                                const editIcon = utils.getByTestId('icon-edit');

                                expect(editIcon).toBeInTheDocument();
                            });
                            it('displays delete icon', () => {
                                const deleteIcon = utils.getByTestId('icon-delete');

                                expect(deleteIcon).toBeInTheDocument();
                            });
                        });
                    });

                    describe('row 2', () => {
                        let utils;

                        beforeEach(() => {
                            const row = screen.getByRole('cell', { name: 'p2' }).closest('tr');
                            utils = within(row);
                        });

                        it('displays correct Sr No', () => {
                            const srNo = utils.getByText('2');

                            expect(srNo).toBeInTheDocument();
                        });

                        it('displays correct name', () => {
                            const name = utils.getByText('p2');

                            expect(name).toBeInTheDocument();
                        });

                        it('displays correct manufacturer', () => {
                            const manufacturer = utils.getByText('m2');

                            expect(manufacturer).toBeInTheDocument();
                        });

                        it('displays correct price', () => {
                            const price = utils.getByText('200');

                            expect(price).toBeInTheDocument();
                        });

                        it('displays correct description', () => {
                            const description = utils.getByText('d2');

                            expect(description).toBeInTheDocument();
                        });

                        describe('correct action icons', () => {
                            it('displays edit icon', () => {
                                const editIcon = utils.getByTestId('icon-edit');

                                expect(editIcon).toBeInTheDocument();
                            });
                            it('displays delete icon', () => {
                                const deleteIcon = utils.getByTestId('icon-delete');

                                expect(deleteIcon).toBeInTheDocument();
                            });
                        });
                    });

                    describe('pagination render', () => {
                        let pagination, utils;

                        beforeEach(() => {
                            pagination = screen.getByTestId('pagination');
                            utils = within(pagination);
                        });

                        it('shows rows per page text', () => {
                            const rowsPerPage = utils.getByText(/rows per page/i);

                            expect(rowsPerPage).toBeInTheDocument();
                        });

                        it('shows default value as 5 in the dropdown to select rows per page', () => {
                            const defaultRowsPerPage = utils.getByText('5');

                            expect(defaultRowsPerPage).toBeInTheDocument();
                        });

                        it('correctly shows records displayed out of total records', () => {
                            const recordDisplay = utils.getByText(/1-2 of 2/i);

                            expect(recordDisplay).toBeInTheDocument();
                        });
                    });
                });

                describe('pagination function', () => {
                    let pagination, utils;
                    const products = [
                        {
                            id: 'unique #1',
                            name: 'p1',
                            manufacturer: 'm1',
                            price: 100,
                            description: 'd1',
                        },
                        {
                            id: 'unique #2',
                            name: 'p2',
                            manufacturer: 'm2',
                            price: 200,
                            description: 'd2',
                        },
                        {
                            id: 'unique #3',
                            name: 'p3',
                            manufacturer: 'm3',
                            price: 300,
                            description: 'd3',
                        },
                        {
                            id: 'unique #4',
                            name: 'p4',
                            manufacturer: 'm4',
                            price: 400,
                            description: 'd4',
                        },
                        {
                            id: 'unique #5',
                            name: 'p5',
                            manufacturer: 'm5',
                            price: 500,
                            description: 'd5',
                        },
                        {
                            id: 'unique #6',
                            name: 'p6',
                            manufacturer: 'm6',
                            price: 600,
                            description: 'd6',
                        },
                    ];
                    const preloadedState = {
                        products: {
                            loading: 'idle',
                            products,
                        }
                    };

                    beforeEach(() => {
                        render(<PaginatedTable />, { preloadedState });
                        pagination = screen.getByTestId('pagination');
                        utils = within(pagination);
                    });

                    it('displays 5 records by default', () => {
                        const tableBody = screen.getByTestId('table-body');

                        expect(within(tableBody).getAllByRole('row')).toHaveLength(5);
                    });

                    it('clicking next icon shows a single record', () => {
                        const nextIcon = utils.getByLabelText(/next page/i);
                        userEvent.click(nextIcon);

                        const tableBody = screen.getByTestId('table-body');

                        expect(within(tableBody).getAllByRole('row')).toHaveLength(1);
                    });

                    it('displays all records when page size is changed to 10', async () => {
                        const pagination = screen.getByTestId('pagination');
                        const sizingDropdown = within(pagination).getByText('5');

                        userEvent.click(sizingDropdown);
                        userEvent.click(screen.getByRole('option', { name: '10' }));

                        const tableBody = await screen.findByTestId('table-body');

                        expect(within(tableBody).getAllByRole('row')).toHaveLength(6);
                    });
                });
            });

            // @TODO -> to be added to App.js tests
            // describe.only('edit action', () => {
            //     it('opens the edit form when edit icon is clicked for a particular product', () => {
            // const products = [
            //     {
            //         id: 'unique #1',
            //         name: 'p1',
            //         manufacturer: 'm1',
            //         price: 100,
            //         description: 'd1',
            //     },
            //     {
            //         id: 'unique #2',
            //         name: 'p2',
            //         manufacturer: 'm2',
            //         price: 200,
            //         description: 'd2',
            //     },
            // ];

            // render(<PaginatedTable />, {
            //     preloadedState: {
            //         products: {
            //             loading: 'idle',
            //             products,
            //         },
            //     },
            // });

            // const row1 = screen.getByRole('cell', { name: 'p1' }).closest('tr');
            // const editIcon = within(row1).getByTestId('icon-edit');
            // userEvent.click(editIcon);

            //         const editForm = screen.getByText(/edit p1/i);

            //         expect(editForm).toBeInTheDocument();
            //     });
            // });

            describe('delete action', () => {
                const products = [
                    {
                        id: 'unique #1',
                        name: 'p1',
                        manufacturer: 'm1',
                        price: 100,
                        description: 'd1',
                    },
                    {
                        id: 'unique #2',
                        name: 'p2',
                        manufacturer: 'm2',
                        price: 200,
                        description: 'd2',
                    },
                ];

                beforeEach(() => {
                    // jest.useFakeTimers();
                    render(<PaginatedTable />, {
                        preloadedState: {
                            products: {
                                loading: 'idle',
                                products,
                            },
                        },
                    });
                    const row1 = screen.getByRole('cell', { name: 'p1' }).closest('tr');
                    const deleteIcon = within(row1).getByTestId('icon-delete');
                    userEvent.click(deleteIcon);
                });

                // afterEach(() => {
                //     jest.runOnlyPendingTimers();
                //     jest.useRealTimers();
                // });

                it('opens up a confirmation modal when delete icon is clicked', () => {
                    const confirmationModal = screen.getByRole('dialog');

                    expect(confirmationModal).toBeInTheDocument();
                });

                describe('delete succeeds', () => {
                    beforeEach(() => {
                        const confirmationModal = screen.getByRole('dialog');
                        const deleteBtn = within(confirmationModal).getByRole('button', { name: 'Delete' });

                        userEvent.click(deleteBtn);
                    });

                    // act warnings
                    it('shows success message when delete succeeds', async () => {
                        const successMessage = await screen.findByText(/product deleted successfully/i);

                        expect(successMessage).toBeInTheDocument();
                    });

                    it.skip('removes the entry from the table', async () => {
                        // await waitForElementToBeRemoved(() => {
                        //     screen.getByText(/product deleted successfully/i);
                        // });

                        const tableBody = screen.getByTestId('table-body');

                        const rows = within(tableBody).getAllByRole('row');

                        expect(rows).toHaveLength(1);
                    });
                });


                it.skip('shows error message when delete fails', async () => {
                    axios.delete.mockImplementationOnce(() => Promise.reject({
                        apiError: 'Something went wrong, please try again!'
                    }));

                    render(<PaginatedTable />, {
                        preloadedState: {
                            products: {
                                loading: 'idle',
                                products,
                            },
                        },
                    });
                    const row1 = screen.getByRole('cell', { name: 'p1' }).closest('tr');
                    const deleteIcon = within(row1).getByTestId('icon-delete');
                    userEvent.click(deleteIcon);

                    const confirmationModal = screen.getByRole('dialog');
                    const deleteBtn = within(confirmationModal).getByRole('button', { name: 'Delete' });

                    userEvent.click(deleteBtn);
                    const errorMsg = await screen.findByText(/something went wrong/i);

                    expect(errorMsg).toBeInTheDocument();
                });
            });
        });
    });
});