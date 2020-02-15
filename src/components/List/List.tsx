import React, {
  FunctionComponent,
  useState,
  useCallback,
} from 'react';
import { Container, Title, AddCardButton } from './List.styles';
import { ICard } from '../../models';
import Card from '../Card/Card';
import nextId from 'react-id-generator';
import {
  DragDropContext,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd';
import { reorder } from '../../utils';

const Column: FunctionComponent = () => {
  const initialCards = [
    { id: nextId(), text: 'I am a post' },
    { id: nextId(), text: 'So am I' },
  ];
  const [posts, setPosts] = useState<ICard[]>(initialCards);

  const handleAddCard = () => {
    setPosts([...posts, { id: nextId(), text: 'new post' }]);
  };

  const handleRemoveCard = (id: string) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const handleEditCard = (id: string, value: string) => {
    const postsCopy = [...posts];
    postsCopy.map(post => {
      if (post.id === id) {
        post.text = value;
      }
      return post;
    });
    setPosts(postsCopy);
  };

  const onDragEnd = useCallback(
    result => {
      // dropped outside the list
      if (!result.destination) {
        return;
      }

      const items: any = reorder<ICard>(
        [...posts],
        result.source.index,
        result.destination.index,
      );

      setPosts(items);
    },
    [posts],
  );

  const getItemStyle = (
    isDragging: boolean,
    draggableStyle: any,
  ) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
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
            <Title>A title</Title>
            {posts.map((post: ICard, index: number) => (
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
                      deleteCard={handleRemoveCard}
                      editCard={handleEditCard}
                    />
                    >
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <AddCardButton onClick={handleAddCard}>
              Add a card
            </AddCardButton>
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Column;
