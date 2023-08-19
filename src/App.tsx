import './App.css'
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import initialData from "./initialData";
import Column from "./components/Column";
import {useState} from "react";
import styled from "@emotion/styled";


export interface TaskDTO {
    id: string;
    content: string;
    type: string;
}


export interface ColumnDTO {
    id: string;
    title: string;
    type: string;
}

export interface SourceDTO {
    index: number
}


interface InitialData {
    tasks: TaskDTO[];
    columns: Record<string, ColumnDTO>;
    columnOrder: string[];
}

function App() {
    const [state, setNewState] = useState<InitialData>(initialData)
    const Container = styled.div`
      display: flex;
    `;

    const onDragStart = () => {

    }
    const onDragUpdate = () => {

    };

    const moveInList = (start: ColumnDTO, source: SourceDTO, destination: { index: number }) => {

        const newTaskIds = state.tasks;

        // remove(move) old item
        const [removed] = newTaskIds.splice(source.index, 1);


        // add(move) new item
        newTaskIds.splice(destination.index, 0, removed);
        console.log(start)
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

    const onDragEnd = (result: DropResult) => {
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
            moveInList( start, source, destination);
        }
        const newState = {
            ...state,
            tasks: state.tasks.map(value => {
                if (value.id === draggableId) {
                    return {
                        ...value,
                        ...{type: finish.type}
                    }
                }
                return value
            }),
        };
        setNewState(newState);
    }
    return (
        <DragDropContext onDragUpdate={onDragUpdate} onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <Container>
                {state.columnOrder.map((columnId) => {
                    const column = state.columns[columnId];
                    const tasks = state.tasks.filter((task: TaskDTO) => task.type == column.type);
                    return <Column key={column.id} column={column} tasks={tasks}/>;
                })}
            </Container>
        </DragDropContext>
    )
}

export default App
