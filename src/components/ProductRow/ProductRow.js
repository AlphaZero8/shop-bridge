import React from 'react';
import { Table } from 'semantic-ui-react';

const ProductRow = () => {
    return (
        <Table.Row>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>Narzo 30 pro</Table.Cell>
            <Table.Cell>A phone</Table.Cell>
            <Table.Cell>Realme</Table.Cell>
            <Table.Cell>15999</Table.Cell>
            <Table.Cell><i className="fas fa-pen-square"></i></Table.Cell>
            <Table.Cell><i className="fas fa-trash-alt"></i></Table.Cell>
        </Table.Row>
    );
};

export default ProductRow;