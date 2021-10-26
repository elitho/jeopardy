import styled from "styled-components";
import { Category } from "types";
import { QuestionCard } from "components";
import { colors } from "shared";

type Props = {
  category: Category,
  categoryIndex: number
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Title = styled.h2`
  margin: 0;
  border-radius: 2px;
  border: 1px solid ${colors.BEKK_SORT};
  box-shadow: 2px 2px 2px 0 ${colors.OVERSKYET_KONTRAST};
`

export const CategoryColumn = ({category: {name, questions}, categoryIndex}: Props) => {
  return (
    <Container>
      <Title>{name}</Title>
      {questions.map((question, index) => (
        <QuestionCard
          key={index}
          question={question}
          categoryIndex={categoryIndex}
          questionIndex={index}
          categoryName={name}
        />
      ))}
    </Container>
  );
}