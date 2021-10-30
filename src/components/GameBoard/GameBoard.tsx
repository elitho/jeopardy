import styled from "styled-components";
import { CategoryColumn } from "components/index";
import { testGameObject } from "shared";

const Container = styled.div`
  padding: var(--big);
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  justify-content: center;
  gap: var(--regular);
  text-align: center;
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