export interface ICard {
  id: string;
  text: string;
  listId: string;
}

export interface IList {
  id: string;
  indexForDrag: number;
  listTitle: string;
}
