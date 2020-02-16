import styled from 'styled-components';

export const Container = styled.div<{ bgColor: string }>`
  height: 100%;
  flex-direction: column;
  overflow-x: scroll;
  background-color: ${({ bgColor }) => bgColor};
  font-family: sans-serif;
`;

export const MenuButton = styled.button``;

export const Lists = styled.div`
  display: flex;
  align-items: flex-start;
`;
