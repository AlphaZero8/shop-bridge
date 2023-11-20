import React from 'react';
import { Table } from 'semantic-ui-react';
import ProductRow from '../ProductRow/ProductRow';

const ProductTable = () => {
    return (
        <Table color="violet" celled structured>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Sr. No.</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell>Manufacturer</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell colSpan={2}>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <ProductRow />
            </Table.Body>
        </Table>
    );
};

export default ProductTable;