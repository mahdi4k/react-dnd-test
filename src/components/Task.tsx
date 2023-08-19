import styled from '@emotion/styled';
import {Draggable} from "react-beautiful-dnd";
import {TaskDTO} from "../App";


const Container = styled.div<{ isDragging?: boolean; }>`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => props.isDragging ? 'lightgreen' : 'aliceblue'};
`;

type Props = {
    task : TaskDTO
    index: number
}
const Task = (props : Props) => {
    return (
        <Draggable draggableId={props.task.id} index={props.index}>
            {(provided, snapshot) => {
                return (
                    <Container isDragging={snapshot.isDragging} {...provided.draggableProps}
                               {...provided.dragHandleProps} ref={provided.innerRef}>{props.task.content}</Container>
                )
            }}
        </Draggable>
    )
}

export default Task
