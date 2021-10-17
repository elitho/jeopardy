import styled from "styled-components";
import { Category } from "types";
import { QuestionCard } from "components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`

const Title = styled.h2`
  margin: 0;
`

export const CategoryColumn = ({ category }: {category: Category}) => {
  return (
    <Container>
      <Title>{category.name}</Title>
      {category.questions.map((question) => (
        <QuestionCard question={question} />
      ))}
    </Container>
  );
}