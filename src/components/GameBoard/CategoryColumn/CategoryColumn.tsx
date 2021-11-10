import styled from 'styled-components';
import { Category } from 'types';
import { QuestionCard } from 'components';
import { colors } from 'shared';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--2X);
`

const Title = styled.h2`
  margin: 0;
  font-family: var(--din-medium);
  background: ${colors.BEKK_HVIT};
  border-radius: var(--1X);
  border: 2px solid ${colors.OVERSKYET_KONTRAST};
  box-shadow: 0 5px ${colors.SKYGGE};
`

type Props = {
  category: Category,
  categoryIndex: number,
  numberOfCategories: number
}

export const CategoryColumn = ({category: {name, questions}, categoryIndex, numberOfCategories}: Props) => {
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
          numberOfQuestions={questions.length}
          numberOfCategories={numberOfCategories}
        />
      ))}
    </Container>
  );
}