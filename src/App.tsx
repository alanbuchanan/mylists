import React, {
  useState,
  useEffect,
  useReducer,
  useCallback,
} from 'react';
import ls from 'local-storage';
import uuidv1 from 'uuid/v1';
import groupBy from 'lodash.groupby';
import List from './components/List/List';
import { DragDropContext } from 'react-beautiful-dnd';
import Options from './components/Options/Options';
import { cardsReducer, listsReducer } from './reducers';
import { IList, ICard } from './models';
import { initialCards, initialLists } from './utils';
import { Container, Lists, NewListButton } from './App.styles';
import './styles.css';
import { reorder } from './utils';

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

  const onDragEnd = useCallback(
    result => {
      // dropped outside the list
      if (!result.destination) {
        return;
      }

      const itemsSplitByListIds = groupBy(cards, (card: any) => {
        return card.listId;
      });

      if (
        result.source.droppableId === result.destination.droppableId
      ) {
        // Items are in the same list, so just re-order the list array
        const target =
          itemsSplitByListIds[result.destination.droppableId];
        const reordered: any = reorder<ICard>(
          [...target],
          result.source.index,
          result.destination.index,
        );

        // Get rid of old list and replace with updated one
        const filteredCards = cards.filter(
          (card: any) => card.listId !== result.source.droppableId,
        );

        cardsDispatch({
          type: 'SET',
          payload: { newState: [...filteredCards, ...reordered] },
        });
      } else {
        // Items are in different lists, so just change the item's listId

        const removeByIndex = (list: any[], index: number) => [
          ...list.slice(0, index),
          ...list.slice(index + 1),
        ];

        const source = cards.filter(
          (card: ICard) => card.listId === result.source.droppableId,
        );
        const sourceWithoutDragged = removeByIndex(
          source,
          result.source.index,
        );

        const target = cards.filter(
          (card: ICard) =>
            card.listId === result.destination.droppableId,
        );

        const itemWithNewId = {
          ...source[result.source.index],
          listId: result.destination.droppableId,
        };

        target.splice(result.destination.index, 0, itemWithNewId);

        const filteredCards = cards.filter(
          (card: any) =>
            card.listId !== result.source.droppableId &&
            card.listId !== result.destination.droppableId,
        );

        cardsDispatch({
          type: 'SET',
          payload: {
            newState: [
              ...filteredCards,
              ...sourceWithoutDragged,
              ...target,
            ],
          },
        });
      }
    },
    [cards],
  );

  return (
    <Container bgColor={bgColor}>
      <Options handleBgColorChange={handleBgColorChange} />
      <DragDropContext onDragEnd={onDragEnd}>
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
      </DragDropContext>
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
