import styled from "styled-components";
import { Category } from "types";
import { QuestionCard } from "components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Title = styled.h2`
  margin: 0;
`

export const CategoryColumn = ({category, categoryIndex}: { category: Category, categoryIndex: number }) => {
  return (
    <Container>
      <Title>{category.name}</Title>
      {category.questions.map((question, index) => (
        <QuestionCard
          key={index}
          question={question}
          categoryIndex={categoryIndex}
          questionIndex={index}
          categoryName={category.name}
        />
      ))}
    </Container>
  );
}