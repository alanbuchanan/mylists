import React, { useState } from 'react';
import List from './components/List/List';
import { CirclePicker } from 'react-color';
import { IList, ICard } from './models';
import ls from 'local-storage';
import uuidv1 from 'uuid/v1';
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
      id: uuidv1(),
      text: 'kwefnofwwefwe',
      listId: 'id0',
    },
  ];

  const listsFromLs = ls.get<IList[]>('lists');
  const cardsFromLs = ls.get<ICard[]>('cards');
  const bgColorFromLs = ls.get<string>('bgColor');

  const [lists, setLists] = useState<IList[]>(
    listsFromLs ? listsFromLs : initialLists,
  );
  const [cards, setCards] = useState<ICard[]>(
    cardsFromLs ? cardsFromLs : initialCards,
  );
  const [bgColor, setBgColor] = useState(
    bgColorFromLs ? bgColorFromLs : '#fff',
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleAddCard = (
    listId: string,
    text: string,
    id: string,
  ) => {
    const newCards = [...cards, { listId, text, id }];
    setCards(newCards);
    ls.set<ICard[]>('cards', newCards);
  };

  const handleRemoveCard = (id: string) => {
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

  const handleRemoveList = (id: string) => {
    const newLists = lists.filter(list => list.id !== id);
    setLists(newLists);
  };

  const handleBgColorChange = (color: { hex: string }) => {
    setBgColor(color.hex);
    ls.set<string>('bgColor', color.hex);
  };

  const updateCardsAfterReorder = (
    reorderedCards: ICard[],
    listId: string,
  ) => {
    const newCards = [
      ...cards.filter(card => card.listId !== listId),
      ...reorderedCards,
    ];
    setCards(newCards);
    ls.set<ICard[]>('cards', newCards);
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
            onChangeComplete={handleBgColorChange}
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
            handleRemoveList={handleRemoveList}
          />
        ))}
        <button
          onClick={() =>
            setLists([
              ...lists,
              {
                id: uuidv1(),
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
