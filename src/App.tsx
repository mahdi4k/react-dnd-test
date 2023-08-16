import './App.css'
import {DragDropContext} from "react-beautiful-dnd";
import initialData from "./initialData";
import Column from "./components/Column";
import {useState} from "react";

function App() {
    const [state, setNewState] = useState(initialData)
    const onDragEnd = (result) => {
        const {destination, source, draggableId} = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const column = state.columns[source.droppableId];
        const newTaskIds = Array.from(column.taskIds);
        // remove(move) old item
        newTaskIds.splice(source.index, 1);
        console.log(newTaskIds, 'newTaskIds')

        // add(move) new item
        newTaskIds.splice(destination.index, 0, draggableId);
        console.log(newTaskIds, 'newTaskIds2')

        const newColumn = {
            ...column,
            taskIds: newTaskIds,
        };

        const newState = {
            ...state,
            columns: {
                ...state.columns,
                [newColumn.id]: newColumn,
            }
        }

        setNewState(newState)
    }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {state.columnOrder.map((columnId) => {
                const column = state.columns[columnId];
                const tasks = column.taskIds.map((taskId: string) => state.tasks[taskId]);
                return <Column key={column.id} column={column} tasks={tasks}/>;
            })}
        </DragDropContext>
    )
}

export default App
