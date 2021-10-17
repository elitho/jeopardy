import styled from "styled-components";
import { CategoryColumn } from "components";
import { Category, Entity, Question } from "types";

const Container = styled.div`
  padding: 2em;
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  justify-content: center;
  gap: 1em;
  text-align: center;
`

const question1 = {
  value: 1,
  entity: Entity.SLURKER,
  question: 'Question',
  answer: 'Answer'
}
const question2 = {
  value: 2,
  entity: Entity.SLURKER,
  question: 'Question',
  answer: 'Answer'
}
const question3 = {
  value: 3,
  entity: Entity.SLURKER,
  question: 'Question',
  answer: 'Answer'
}
const question4 = {
  value: 4,
  entity: Entity.SLURKER,
  question: 'Question',
  answer: 'Answer'
}
const question5 = {
  value: 5,
  entity: Entity.SLURKER,
  question: 'Question',
  answer: 'Answer'
}

const questionArray: Array<Question> = [question5, question4, question3,question2,question1];

const category1 = {
  name: 'Godt og blandet',
  questions: questionArray
}
const category2 = {
  name: 'Musikk',
  questions: questionArray
}
const category3 = {
  name: 'Geograrfi',
  questions: questionArray
}
const category4 = {
  name: 'Sport',
  questions: questionArray
}
const category5 = {
  name: 'Historie',
  questions: questionArray
}

const gameObject: Array<Category> = [category1, category2, category3, category4, category5];

export const GameBoard = () => {
  return (
    <Container>
      {gameObject.map((category) => (
        <CategoryColumn category={category} />
      ))}
    </Container>
  );
}