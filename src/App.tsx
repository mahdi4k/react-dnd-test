import './App.css'
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import initialData from "./initialData";
import Column from "./components/Column";
import { useState } from "react";
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

    const moveInList = (start: ColumnDTO, source: SourceDTO, destination: { index: number, droppableId: string }, draggableId) => {

        const column = state.columns[destination.droppableId];

        const newTaskIds = state.tasks.filter(el => el.type == column.type);
        // remove(move) old item
        const [removed] = newTaskIds.splice(source.index, 1);
        console.log("🚀 ~ file: App.tsx:58 ~ moveInList ~ removed:", removed)



        // add(move) new item
        newTaskIds.splice(destination.index, 0, removed);

        // merge tasks with new order 
        const ids = new Set(newTaskIds.map(d => d.id));
        const merged = [...newTaskIds, ...state.tasks.filter(d => !ids.has(d.id))];

        const newState = {
             ...state,
             tasks:merged
        }
        setNewState(newState)
        return;
    }

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const start = state.columns[source.droppableId];
        const finish = state.columns[destination.droppableId];

        if (start === finish) {
            moveInList(start, source, destination, draggableId);
        } else {

            // step 1 : find started column and geted(splice) that item  
            const startTaskIds = state.tasks.filter(el => el.type == start.type);
            const [removed] = startTaskIds.splice(source.index, 1);
            console.log(removed,'remveved');
            
            // step 2 moved spliced item from step 1 to finish destination 
            const finishTaskIds = state.tasks.filter(el => el.type == finish.type);
            // change type destiniation column type
            removed.type = finish.type
            // move selected item to distination final
            finishTaskIds.splice(destination.index, 0, removed);
            console.log(finishTaskIds);
            
            // merge and remove duplicate items
            const final = [...startTaskIds,...finishTaskIds]
            console.log("🚀 ~ file: App.tsx:105 ~ onDragEnd ~ final:", final)
            const ids = new Set(final.map(d => d.id));
            const merged = [...final, ...state.tasks.filter(d => !ids.has(d.id))];
            console.log("🚀 ~ file: App.tsx:109 ~ onDragEnd ~ merged:", merged)

            const newState = {
                ...state,
                tasks: merged,
            };
            console.log(newState,'newState');

            setNewState(newState);
        }

    }
    return (
        <DragDropContext onDragUpdate={onDragUpdate} onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <Container>
                {state.columnOrder.map((columnId) => {
                    const column = state.columns[columnId];
                    const tasks = state.tasks.filter((task: TaskDTO) => task.type == column.type);
                    return <Column key={column.id} column={column} tasks={tasks} />;
                })}
            </Container>
        </DragDropContext>
    )
}

export default App
