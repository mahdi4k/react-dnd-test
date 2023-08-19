const initialData = {
    tasks: [
        {id: 'task-1', content: 'Take out the garbage', type: 'todo',},
        {id: 'task-2', content: 'Watch my favorite show', type: 'todo',},
        {id: 'task-3', content: 'Charge my phone', type: 'todo',},
        {id: 'task-4', content: 'Cook dinner', type: 'todo',},
    ],
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'To do',
            type: 'todo',
        },
        'column-2': {
            id: 'column-2',
            title: 'In progress',
            type: 'doing',
        },
        'column-3': {
            id: 'column-3',
            title: 'Done',
            type: 'done',
        },
    },
    // Facilitate reordering of the columns
    columnOrder: ['column-1', 'column-2', 'column-3'],
};

export default initialData;

