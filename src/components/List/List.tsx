import React, { FunctionComponent, useCallback } from 'react';
import {
  Container,
  Header,
  CloseButton,
  Title,
  AddCardButton,
} from './List.styles';
import Card from '../Card/Card';
import uuidv1 from 'uuid/v1';
import {
  DragDropContext,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd';
import { reorder } from '../../utils';
import { IList, ICard } from '../../models';

interface IListProps {
  list: IList;
  cards: ICard[];
  updateCardsAfterReorder: any;
  cardsDispatch: any;
  listsDispatch: any;
}

const List: FunctionComponent<IListProps> = ({
  list,
  cards,
  updateCardsAfterReorder,
  cardsDispatch,
  listsDispatch,
}) => {
  const onDragEnd = useCallback(
    result => {
      // dropped outside the list
      if (!result.destination) {
        return;
      }

      const items: any = reorder<ICard>(
        [...cards],
        result.source.index,
        result.destination.index,
      );

      updateCardsAfterReorder(items, list.id);
    },
    [cards],
  );

  const getItemStyle = (
    isDragging: boolean,
    draggableStyle: any,
  ) => ({
    background: 'white',
    padding: '10px',
    marginBottom: '5px',

    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? 'lightblue' : 'rgb(235, 236, 240)',
    width: 250,
  });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-1">
        {(provided, snapshot) => (
          <Container
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            <Header>
              <Title>{list.listTitle}</Title>
              <CloseButton
                onClick={() =>
                  listsDispatch({
                    type: 'REMOVE',
                    payload: { id: list.id },
                  })
                }
              >
                &times;
              </CloseButton>
            </Header>
            {cards.map((post: ICard, index: number) => (
              <Draggable
                key={post.id}
                index={index}
                draggableId={`draggable-${post.id}`}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style,
                    )}
                  >
                    <Card
                      key={post.id}
                      text={post.text}
                      id={post.id}
                      listId={list.id}
                      cardsDispatch={cardsDispatch}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <AddCardButton
              onClick={evt =>
                cardsDispatch({
                  type: 'ADD',
                  payload: {
                    listId: list.id,
                    text: 'te3st',
                    id: uuidv1(),
                  },
                })
              }
            >
              Add a card
            </AddCardButton>
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default List;
