import React, { useState } from 'react';
import List from './components/List/List';
import { Container } from './App.styles';
import './styles.css';
import nextId from 'react-id-generator';

export default function App() {
  const [lists, setLists] = useState([{ id: nextId() }]);

  return (
    <Container>
      {lists.map((list: any) => (
        <List key={list.id} />
      ))}
      <button onClick={() => setLists([...lists, { id: nextId() }])}>
        New list
      </button>
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
