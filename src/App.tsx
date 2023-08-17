import './App.css'
import {DragDropContext} from "react-beautiful-dnd";
import initialData from "./initialData";
import Column from "./components/Column";
import {useState} from "react";
import styled from "@emotion/styled";


function App() {
    const [state, setNewState] = useState(initialData)
    const Container = styled.div`
      display: flex;
    `;

    const onDragStart = () => {

    }
    const onDragUpdate = () => {

    };
    const onDragEnd = (result) => {
        const {destination, source, draggableId} = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const start = state.columns[source.droppableId];
        const finish = state.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            // remove(move) old item
            newTaskIds.splice(source.index, 1);


            // add(move) new item
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
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
            return;
        }

        // Moving from one list to another
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        };

        const newState = {
            ...state,
            columns: {
                ...state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        };
        setNewState(newState);


    }
    return (
        <DragDropContext onDragUpdate={onDragUpdate} onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <Container>
                {state.columnOrder.map((columnId) => {
                    const column = state.columns[columnId];
                    const tasks = column.taskIds.map((taskId: string) => state.tasks[taskId]);
                    return <Column key={column.id} column={column} tasks={tasks}/>;
                })}
            </Container>
        </DragDropContext>
    )
}

export default App
