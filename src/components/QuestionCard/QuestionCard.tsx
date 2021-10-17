import { Question } from "types";
import styled from "styled-components";

const Card = styled.div`
  height: 120px;
  width: 200px;
  display: flex;
  background: #0d80ad;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 2px 2px 2px 0 grey;
  
  &:hover {
    transform: scale(1.1);
  }
`

export const QuestionCard = ({ question }: {question: Question}) => {
  return (
    <Card>
      {question.value + ' ' + question.entity}
    </Card>
  );
}
