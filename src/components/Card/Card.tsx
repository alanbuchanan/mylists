import React, { FunctionComponent, useState } from 'react';
import { Container } from './Card.styles';
// import ls, { get, set } from 'local-storage';

interface ICard {
  text: string;
  id: string;
  deleteCard: (id: string) => void;
  editCard: (id: string, value: string) => void;
}

const Post: FunctionComponent<ICard> = ({
  text,
  id,
  deleteCard,
  editCard,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState(text);
  const onDeleteClick = (evt: any, id: string) => {
    deleteCard(id);
  };

  const onEditClick = (evt: any, id: string) => {
    setIsEdit(true);
  };

  const handleSaveClick = () => {
    setIsEdit(false);
    console.log('fewofoe', editValue);
    editCard(id, editValue);
  };
  return (
    <Container>
      {isEdit ? (
        <input
          type="text"
          defaultValue={text}
          onChange={evt => setEditValue(evt.target.value)}
        />
      ) : (
        text
      )}
      {isEdit ? (
        <button onClick={handleSaveClick}>save</button>
      ) : (
        <div onClick={evt => onEditClick(evt, id)}>✎</div>
      )}
      <div onClick={evt => onDeleteClick(evt, id)}>&times;</div>
    </Container>
  );
};

export default Post;
