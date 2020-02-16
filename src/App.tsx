import React, { useState, useEffect, useReducer } from 'react';
import List from './components/List/List';
import { cardsReducer, listsReducer } from './reducers';
import { CirclePicker } from 'react-color';
import { IList, ICard } from './models';
import ls from 'local-storage';
import uuidv1 from 'uuid/v1';
import { Container, MenuButton, Lists } from './App.styles';
import './styles.css';

export default function App() {
  const initialLists: IList[] = [
    {
      id: 'id0',
      listTitle: 'wfoiefmowie',
    },
  ];

  const initialCards: ICard[] = [
    {
      id: uuidv1(),
      text: 'kwefnofwwefwe',
      listId: 'id0',
    },
  ];

  const listsFromLs = ls.get<IList[]>('lists');
  const cardsFromLs = ls.get<ICard[]>('cards');
  const bgColorFromLs = ls.get<string>('bgColor');

  // const [lists, setLists] = useState<IList[]>(
  //   listsFromLs ? listsFromLs : initialLists,
  // );

  const [bgColor, setBgColor] = useState(
    bgColorFromLs ? bgColorFromLs : 'dodgerblue',
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [cards, cardsDispatch] = useReducer(
    cardsReducer,
    cardsFromLs ? cardsFromLs : initialCards,
  );

  const [lists, listsDispatch] = useReducer(
    listsReducer,
    listsFromLs ? listsFromLs : initialLists,
  );

  useEffect(() => {
    ls.set<ICard[]>('cards', cards);
    ls.set<IList[]>('lists', lists);
    console.log('cards or lists changed');
  }, [cards, lists]);

  // const handleRemoveList = (id: string) => {
  //   const newLists = lists.filter(list => list.id !== id);
  //   setLists(newLists);
  // };

  const handleBgColorChange = (color: { hex: string }) => {
    setBgColor(color.hex);
    ls.set<string>('bgColor', color.hex);
  };

  const updateCardsAfterReorder = (
    reorderedCards: ICard[],
    listId: string,
  ) => {
    cardsDispatch({
      type: 'REORDER',
      payload: { listId, reorderedCards },
    });
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
            cardsDispatch={cardsDispatch}
            listsDispatch={listsDispatch}
          />
        ))}
        <button
          onClick={() => {
            listsDispatch({
              type: 'ADD',
              payload: {
                id: uuidv1(),
                listTitle: 'new list',
              },
            });
          }}
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
// When list deleted, delete all cards with that listId, otherwise loads of cards hang around in localstorage

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
