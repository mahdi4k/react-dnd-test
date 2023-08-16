import styled from '@emotion/styled';
import Task from './Task';
import {Droppable} from "react-beautiful-dnd";
import {useEffect, useState} from "react";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div<{ isDraggingOver?: boolean; }>`
  padding: 8px;
  background-color: ${props => props.isDraggingOver ? 'skyblue' : 'white'};

`;


const Column = (props) => {
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
