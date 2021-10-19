import { Question } from "types";
import styled from "styled-components";
import { useState } from "react";
import cross_black from 'icons/cross_black.svg';
import smiley_correct from 'icons/emoji_1.svg'
import smiley_wrong from 'icons/emoji_2.svg'
import { colors, colorMap, contrastColorMap } from "shared";

const Card = styled.div<{ categoryIndex: number, questionIndex: number, active: boolean }>`
  font-weight: 100;
  height: 120px;
  width: 194px;
  background: ${props => (colorMap[props.categoryIndex])};
  transition-duration: .5s;
  transition-property: z-index,border-radius,box-shadow,transform;
  transform-style: preserve-3d;
  position: relative;
  cursor: ${props => (props.active ? 'auto' : 'pointer')};
  z-index: ${props => (props.active ? '3' : '0')};
  border-radius: ${props => (props.active ? '2px' : '8px')};
  box-shadow: ${props => (props.active ? '-1px 1px 1px 0 ' + colors.OVERSKYET_KONTRAST : '2px 2px 2px 0 ' + colors.OVERSKYET_KONTRAST)};
  transform: ${props => (props.active
  ? 'rotateY(180deg) ' +
  'scale(5.9, 5.9) ' +
  'translateX(' + ((36.7 - (props.categoryIndex * 18.3)) * -1) + '%) ' +
  'translateY(' + (35.5 - (props.questionIndex * 19.2)) + '%)'
  : 'none')};
  
  &:hover {
    background: ${props => (props.active ? colorMap[props.categoryIndex] : contrastColorMap[props.categoryIndex])};
  }
`

// 'scale(5.35, 5.9) ' +
// 'translateX(' + ((40.5 - (props.categoryIndex * 20.3)) * -1) + '%) ' +
// 'translateY(' + (35.5 - (props.questionIndex * 19.2)) + '%)'

const Front = styled.div`
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  transform: rotateY(0deg);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Span = styled.span`
  font-size: 24px;
`

const Back = styled.div`
  padding: 0.6em 1em;
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transform: rotateY(180deg);
`

const CloseButton = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: 0;
  right: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
`

const Img = styled.img`
  height: 20px;
  width: 20px;
`

const Title = styled.h1`
  margin: 0;
  font-family: NewzaldBook, Newzald-Book, Newzald;
  font-size: 14px;
  font-weight: 100;
`

const QuestionSpan = styled.span`
  font-size: 8px;
`

const AnswerSpan = styled.span`
  font-size: 8px;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1em;
`


const SmileyButton = styled.button`
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  height: 15px;
  box-shadow: 1px 1px 1px 0 #525252;
  cursor: pointer;
`

const Smiley = styled.img`
  height: 100%;
  width: 100%;
`

type Props = {
  question: Question,
  categoryIndex: number,
  questionIndex: number,
  categoryName: string,
}

export const QuestionCard = ({question, categoryIndex, questionIndex, categoryName}: Props) => {
  const [active, setActive] = useState(false);

  const open = () => {
    setActive(true);
  }

  const close = () => {
    setActive(false);
  }

  return (
    <Card active={active} categoryIndex={categoryIndex} questionIndex={questionIndex}>
      <Front onClick={open}>
        <Span>{question.value + ' ' + question.entity}</Span>
      </Front>
      <Back>
        <CloseButton onClick={close}><Img src={cross_black} alt={'close button'} /></CloseButton>
        <Title>{categoryName + ' - ' + question.value + ' ' + question.entity}</Title>
        <QuestionSpan>{question.question}</QuestionSpan>
        <AnswerSpan>Se svar</AnswerSpan>
        <ButtonContainer>
          <SmileyButton><Smiley src={smiley_wrong} alt={'Wrong smiley'} /></SmileyButton>
          <SmileyButton><Smiley src={smiley_correct} alt={'Correct smiley'} /></SmileyButton>
        </ButtonContainer>
      </Back>
    </Card>
  );
}
