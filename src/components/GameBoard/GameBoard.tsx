import styled from "styled-components";
import { CategoryColumn } from "components";
import { testGameObject } from "shared";

const Container = styled.div`
  padding: 2em;
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  justify-content: center;
  gap: 1em;
  text-align: center;
  margin-top: 2em;
`

export const GameBoard = () => {
  return (
    <Container>
      {testGameObject.map((category, index) => (
        <CategoryColumn key={index} category={category} categoryIndex={index}/>
      ))}
    </Container>
  );
}