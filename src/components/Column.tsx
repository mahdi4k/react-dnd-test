import styled from '@emotion/styled';
import Task from './Task';
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { ColumnDTO, TaskDTO } from "../App";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  background-color:white;
  width: 220px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div<{ isDraggingOver?: boolean; }>`
  padding: 8px;
  background-color: ${props => props.isDraggingOver ? 'skyblue' : 'white'};
  border: ${props => props.isDraggingOver ? '1px dashed ' : 'unset'};
`;

type Props = {
    column: ColumnDTO
    tasks: TaskDTO[]
    index: number
}
const Column = (props: Props) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);
    return (
        <Draggable draggableId={props.column.id} index={props.index}>

            {(provided) => (
                <Container {...provided.draggableProps}
                    ref={provided.innerRef}>
                    <Title {...provided.dragHandleProps} >{props.column.title}</Title>
                    {isMounted ?
                        (
                            <Droppable type={'task'} droppableId={props.column.id}>
                                {(provided, snapshot) => {
                                    return (
                                        <TaskList isDraggingOver={snapshot.isDraggingOver} {...provided.droppableProps}
                                            ref={provided.innerRef}>
                                            {props.tasks.map((task, index) => (
                                                <Task key={task.id} task={task} index={index} />))}
                                            {provided.placeholder}
                                        </TaskList>
                                    )
                                }}

                            </Droppable>
                        ) : ''
                    }
                </Container>
            )}


        </Draggable>


    )
}

export default Column
