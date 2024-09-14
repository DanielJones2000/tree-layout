export default {
    id: 'root',
    name: 'Root',
    children: [
        {
            name: 'Child 1',
            width: 100,
            children: [
                {
                    name: 'Grandchild 1',
                    width: 100,
                },
                {
                    name: 'Grandchild 2',
                    width: 100,
                },
                {
                    name: 'Grandchild 3',
                    width: 100,
                }
            ]
        },
        {
            name: 'Child 2',
            width: 100,
            children: [
                {
                    name: 'Grandchild 5',
                    width: 100,
                },
                {
                    name: 'Grandchild 6',
                    width: 100,
                }
            ]
        },
        {
            name: 'Child 3',
            width: 100,
        }
    ]
}