console.log('in the mock axios module');

const mockAxios = {
    get: jest.fn().mockResolvedValue({
        data: [
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
    }),

    post: jest.fn(() => Promise.resolve({
        data: {
            id: 'unique #3',
            name: 'p3',
            manufacturer: 'm3',
            price: 300,
            description: 'd3',
        },
    })),

    patch: jest.fn(() => Promise.resolve({
        data: {
            id: 'unique #1',
            name: 'updated p1',
            manufacturer: 'updated m1',
            price: 101,
            description: 'updated d1',
        }
    })),

    delete: jest.fn(() => Promise.resolve()),
};

export default mockAxios;