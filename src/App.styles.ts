import styled from 'styled-components';

export const Container = styled.div<{ bgColor: string }>`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ bgColor }) => bgColor};
  font-family: sans-serif;
`;

export const MenuButton = styled.button``;

export const Lists = styled.div`
  display: flex;
`;
