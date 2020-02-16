import React, { FunctionComponent, useCallback } from 'react';
import { Container, Title, AddCardButton } from './List.styles';
import Card from '../Card/Card';
import nextId from 'react-id-generator';
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
  handleAddCard: (listId: string, text: string, id: string) => void;
  handleEditCard: (id: string, value: string) => void;
  handleRemoveCard: (listId: string, id: string) => void;
}

const List: FunctionComponent<IListProps> = ({
  list,
  cards,
  updateCardsAfterReorder,
  handleAddCard,
  handleEditCard,
  handleRemoveCard,
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
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
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
            <Title>{list.listTitle}</Title>
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
                      deleteCard={handleRemoveCard}
                      editCard={handleEditCard}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <AddCardButton
              onClick={evt =>
                handleAddCard(list.id, 'test', nextId())
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
