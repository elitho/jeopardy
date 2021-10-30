import styled from "styled-components";
import { Category } from "types";
import { QuestionCard } from "components/index";
import { colors } from "shared";

type Props = {
  category: Category,
  categoryIndex: number
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--regular);
`

const Title = styled.h2`
  margin: 0;
  font-family: var(--din-medium);
  background: ${colors.BEKK_HVIT};
  border-radius: 8px;
  border: 2px solid ${colors.OVERSKYET_KONTRAST};
  box-shadow: 0 5px ${colors.SKYGGE};
`

export const CategoryColumn = ({category: {name, questions}, categoryIndex}: Props) => {
  return (
    <Container>
      <Title>{name}</Title>
      {questions.map((question, index) => (
        <QuestionCard
          key={categoryIndex + index}
          question={question}
          categoryIndex={categoryIndex}
          questionIndex={index}
          categoryName={name}
        />
      ))}
    </Container>
  );
}