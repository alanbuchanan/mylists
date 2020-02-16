import React, { useState } from 'react';
import List from './components/List/List';
import Card from './components/Card/Card';
import nextId from 'react-id-generator';
import { CirclePicker } from 'react-color';
import { IList, ICard } from './models';
import { Container, MenuButton, Lists } from './App.styles';
import './styles.css';

export default function App() {
  const initialLists = [
    {
      id: 'id0',
      indexForDrag: 0,
      listTitle: 'wfoiefmowie',
    },
  ];

  const initialCards = [
    {
      id: nextId(),
      text: 'kwefnofwwefwe',
      listId: 'id0',
    },
  ];

  const [lists, setLists] = useState<IList[]>(initialLists);
  const [cards, setCards] = useState<ICard[]>(initialCards);
  const [bgColor, setBgColor] = useState('#fff');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleAddCard = (
    listId: string,
    text: string,
    id: string,
  ) => {
    setCards([...cards, { listId, text, id }]);
  };

  const handleRemoveCard = (listId: string, id: string) => {
    setCards(cards.filter(card => card.id !== id));
  };

  const handleEditCard = (id: string, value: string) => {
    const cardsCopy = [...cards];
    const foundCard = cardsCopy.find(card => card.id === id);
    if (foundCard) {
      foundCard.text = value;
    }
    setCards(cardsCopy);
  };

  const handleChangeComplete = (color: { hex: string }) => {
    setBgColor(color.hex);
  };

  const updateCardsAfterReorder = (
    reorderedCards: ICard[],
    listId: string,
  ) => {
    setCards([
      ...cards.filter(card => card.listId !== listId),
      ...reorderedCards,
    ]);
  };

  return (
    <Container bgColor={bgColor}>
      <div>
        <MenuButton onClick={() => setSidebarOpen(!sidebarOpen)}>
          menu
        </MenuButton>
        {sidebarOpen && (
          <CirclePicker
            color={bgColor}
            onChangeComplete={handleChangeComplete}
          />
        )}
      </div>
      <Lists>
        {lists.map((list: any) => (
          <List
            key={list.id}
            list={list}
            cards={cards.filter(card => card.listId === list.id)}
            updateCardsAfterReorder={updateCardsAfterReorder}
            handleAddCard={handleAddCard}
            handleEditCard={handleEditCard}
            handleRemoveCard={handleRemoveCard}
          />
        ))}
        <button
          onClick={() =>
            setLists([
              ...lists,
              {
                id: nextId(),
                indexForDrag: 0,
                listTitle: 'new list',
              },
            ])
          }
        >
          New list
        </button>
      </Lists>
    </Container>
  );
}

// Loading spinner
// Make it work on a phone
// refactor setPosts into useReducer - List.tsx
// Remove anys
// gitignore and readme

// Animations
// Persist to storage - db - automatically copy state?
// Unit tests

// [
//   {
//     indexForDrag: 2,
//     listId: 23423,
//     listTitle: 'wfoiefmowie',
//     cards: [
//       {
//         id: 23,
//         text: 'kwefnofwe'
//       }
//       ...
//     ]
//   }
//   ...
// ]
