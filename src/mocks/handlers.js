import { rest } from 'msw';

export const handlers = [
    rest.get('http://localhost:5000/products', (req, res, ctx) => {
        return res(
            ctx.json(
                // {
                    // data:
                        [
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
                        ],
                // }
            )
        );
    }),
    rest.post('http://localhost:5000/products', (req, res, ctx) => {
        return res(
            ctx.json(
                {
                    id: 'unique #3',
                    name: 'p3',
                    manufacturer: 'm3',
                    price: 300,
                    description: 'd3',
                }
            )
        );
    }),
    rest.patch('http://localhost:5000/products/:productId', (req, res, ctx) => {
        return res(
            ctx.json(
                {
                    id: 'unique #1',
                    name: 'updated p1',
                    manufacturer: 'updated m1',
                    price: 101,
                    description: 'updated d1',
                }
            )
        );
    }),
    rest.delete('http://localhost:5000/products/:productId', (req, res, ctx) => {
        return res(
            ctx.json(
                {
                    id: 'unique #2',
                    name: 'p2',
                    manufacturer: 'm2',
                    price: 200,
                    description: 'd2',
                },
            )
        );
    }),
];