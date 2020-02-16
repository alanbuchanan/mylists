import React, { useState, useEffect, useReducer } from 'react';
import ls from 'local-storage';
import uuidv1 from 'uuid/v1';
import List from './components/List/List';
import Options from './components/Options/Options';
import { cardsReducer, listsReducer } from './reducers';
import { IList, ICard } from './models';
import { initialCards, initialLists } from './utils';
import { Container, Lists, NewListButton } from './App.styles';
import './styles.css';

export default function App() {
  const listsFromLs = ls.get<IList[]>('lists');
  const cardsFromLs = ls.get<ICard[]>('cards');
  const bgColorFromLs = ls.get<string>('bgColor');

  const [bgColor, setBgColor] = useState(
    bgColorFromLs ? bgColorFromLs : 'dodgerblue',
  );

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
      <Options handleBgColorChange={handleBgColorChange} />

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
        <NewListButton
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
          + New list
        </NewListButton>
      </Lists>
    </Container>
  );
}

// basic functionality:
// edit cards
// edit list names
//able to enter name when creating list
//able to enter name when creating card
// css
// When list deleted, delete all cards with that listId, otherwise loads of cards hang around in localstorage
// drag cards between lists
// drag and drop lists
// gitignore and readme
// make components smaller, split into separate small components
// work on menu
// icons fo new list and card
// draggable handle fix

// Unit tests
// Remove anys
// Animations
