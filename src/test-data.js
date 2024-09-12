export default {
    id: 'root',
    name: 'Root',
    children: [
        {
            name: 'Child 1',
            children: [
                { name: 'Grandchild 1' },
                { name: 'Grandchild 2' },
                { name: 'Grandchild 3' },
                { name: 'Grandchild 4' }
            ]
        },
        {
            name: 'Child 2',
            children: [
                { name: 'Grandchild 5' },
                { name: 'Grandchild 6' }
            ]
        },
        {
            name: 'Child 3'
        }
    ]
}