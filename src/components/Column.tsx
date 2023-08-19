import styled from '@emotion/styled';
import Task from './Task';
import {Droppable} from "react-beautiful-dnd";
import {useEffect, useState} from "react";
import { ColumnDTO, TaskDTO} from "../App";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;;
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
  flex-grow: 1;
  min-height: 100px;
`;

type Props ={
    column:ColumnDTO
    tasks:TaskDTO[]
}
const Column = (props:Props) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);
    return (
        <Container>
            <Title>{props.column.title}</Title>
            {isMounted ?
                (
                    <Droppable droppableId={props.column.id}>
                        {(provided, snapshot) => {
                            return (
                                <TaskList isDraggingOver={snapshot.isDraggingOver} {...provided.droppableProps}
                                          ref={provided.innerRef}>
                                    {props.tasks.map((task, index) => (
                                        <Task key={task.id} task={task} index={index}/>))}
                                    {provided.placeholder}
                                </TaskList>
                            )
                        }}

                    </Droppable>
                ) : ''
            }
        </Container>
    )
}

export default Column
