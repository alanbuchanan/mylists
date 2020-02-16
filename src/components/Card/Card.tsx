import React, { FunctionComponent, useState } from 'react';
import { Container, Left, Right } from './Card.styles';

interface ICard {
  text: string;
  id: string;
  listId: string;
  deleteCard: (id: string) => void;
  editCard: (id: string, value: string) => void;
}

const Card: FunctionComponent<ICard> = ({
  text,
  id,
  deleteCard,
  listId,
  editCard,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState(text);
  const onDeleteClick = () => {
    deleteCard(id);
  };

  const onEditClick = (evt: any, id: string) => {
    setIsEdit(true);
  };

  const handleSaveClick = () => {
    setIsEdit(false);
    editCard(id, editValue);
  };
  return (
    <Container>
      <Left>
        {isEdit ? (
          <input
            type="text"
            defaultValue={text}
            onChange={evt => setEditValue(evt.target.value)}
          />
        ) : (
          text
        )}
      </Left>
      <Right>
        {isEdit ? (
          <button onClick={handleSaveClick}>save</button>
        ) : (
          <div onClick={evt => onEditClick(evt, id)}>✎</div>
        )}
        <div onClick={evt => onDeleteClick()}>&times; {id}</div>
      </Right>
    </Container>
  );
};

export default Card;
