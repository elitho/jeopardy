import { Question } from 'types';
import styled from 'styled-components';
import React, { createRef, useCallback, useEffect, useState } from 'react';
import cross_black from 'icons/cross_black.svg';
import smiley_correct from 'icons/happy_smiley.svg'
import smiley_wrong from 'icons/sad_smiley.svg'
import { activeColorMap, colorMap, colors, contrastColorMap } from 'shared';
import { useRecoilState } from "recoil";
import { anyQuestionActive } from "shared/questionActiveAtom";
import { cardRefsArray } from "shared/cardRefsAtom";
import { ArrowKey, ArrowKeys } from "types/util";

const PerspectiveBox = styled.div<{ active: boolean, zindex: string }>`
  height: 120px;
  width: 194px;
  perspective: 1000px;
  z-index: ${({zindex}) => zindex};
`

const Card = styled.div<{ categoryIndex: number, questionIndex: number, zindex: string, active: boolean }>`
  font-weight: 100;
  height: 100%;
  width: 100%;
  background: ${({categoryIndex}) => (colorMap[categoryIndex])};
  transition-duration: .6s;
  transition-timing-function: cubic-bezier(0.68, -0.25, 0.27, 1.25);
  transition-property: border-radius,box-shadow,transform;
  transform-style: preserve-3d;
  position: relative;
  cursor: ${({active}) => (active ? 'auto' : 'pointer')};
  border-radius: ${({active}) => (active ? '2px' : '8px')};
  border: 2px solid ${({categoryIndex}) => (contrastColorMap[categoryIndex])};
  box-shadow: ${({active}) => (active ? '0 2px ' + colors.SKYGGE : '0 6px ' + colors.SKYGGE)};
  transform: ${({active, categoryIndex, questionIndex}) => (active
    ? 'rotateY(' + (categoryIndex < 3 ? '180deg' : '-180deg') + ') ' +
    'scale(6, 6) ' +
    'translateX(' + ((36.7 - (categoryIndex * 18.3)) * -1) + '%) ' +
    'translateY(' + (33.8 - (questionIndex * 18.9)) + '%)'
    : 'none')};
  
  &:hover, &:focus-visible {
    background: ${props => (props.active
      ? colorMap[props.categoryIndex]
      : (props.zindex === '0'
        ? contrastColorMap[props.categoryIndex]
        : colorMap[props.categoryIndex]))};
    border-color: ${props => (props.active
      ? contrastColorMap[props.categoryIndex]
      : (props.zindex === '0'
        ? colorMap[props.categoryIndex]
        : contrastColorMap[props.categoryIndex]))};
    outline: none;
  }
`

const Front = styled.div<{ categoryIndex: number }>`
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  transform: rotateY(0deg);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  
  &:active {
    background: ${({categoryIndex}) => (activeColorMap[categoryIndex])};
  }
`

const Span = styled.span`
  font-size: 4.5rem;
  font-family: var(--newzald);
`

const Back = styled.div`
  padding: 10px var(--regular);
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

const CloseButton = styled.button<{ categoryIndex: number }>`
  height: 10px;
  width: 10px;
  background: none;
  border: none;
  position: absolute;
  top: 6px;
  right: 6px;
  padding: 0;
  margin: 0;
  cursor: pointer;
  
  &:hover, &:active, &:focus-visible {
    outline: none;
    border-radius: 50%;
    background: ${({categoryIndex}) => (contrastColorMap[categoryIndex])};
  }
  
  &:active {
    background: ${({categoryIndex}) => (activeColorMap[categoryIndex])};
  }
`

const Img = styled.img`
  position: absolute;
  top: 2px;
  left: 2px;
  width: 6px;
  height: 6px;
`

const Title = styled.h1`
  margin: 0;
  font-size: .875rem;
  font-weight: 100;
`

const QuestionSpan = styled.span`
  font-size: 0.5rem;
`

const AnswerSpan = styled.span<{ showAnswer: boolean, categoryIndex: number }>`
  font-size: 0.5rem;
  width: fit-content;
  margin: 0 auto;
  border-bottom: ${({categoryIndex}) => ('1px solid ' + colorMap[categoryIndex])};
  
  &:hover, &:focus-visible {
    outline: none;
    cursor: ${({showAnswer}) => (showAnswer ? 'default' : 'pointer')};
    border-bottom: ${({showAnswer, categoryIndex}) => (showAnswer
      ? '1px solid ' + colorMap[categoryIndex]
      : '1px solid ' + contrastColorMap[categoryIndex])};
  }
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: var(--small);
`

const SmileyButton = styled.button<{ green?: boolean }>`
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  height: var(--regular);
  cursor: pointer;
  border: 1px solid ${({green}) => (green ? colors.GRØNN_KONTRAST : colors.SOLNEDGANG_KONTRAST)};
  
  &:hover, &:focus-visible {
    outline: none;
    backface-visibility: hidden;
    border: 1px solid ${({green}) => (green ? colors.GRØNN_AKTIV : colors.SOLNEDGANG_AKTIV)};
  }
  
  &:active {
    border: 1px solid ${({green}) => (green ? colors.GRØNN_SMILEY_AKTIV : colors.SOLNEDGANG_SMILEY_AKTIV)};
  }
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
  numberOfQuestions: number,
  numberOfCategories: number,
}

export const QuestionCard = ({
                               question: {value, entity, question, answer},
                               categoryIndex,
                               questionIndex,
                               categoryName,
                               numberOfQuestions,
                               numberOfCategories
                             }: Props) => {
  const [isAnyQuestionActive, setAnyQuestionActive] = useRecoilState(anyQuestionActive);
  const [cardRefs, setCardRefs] = useRecoilState(cardRefsArray);
  const [active, setActive] = useState(false);
  const [zindex, setZindex] = useState('0');
  const [showAnswer, setShowAnswer] = useState(false);
  const cardRef = createRef<HTMLDivElement>();
  const myPosition = ((categoryIndex * numberOfQuestions) + 1) + questionIndex;
  const totalNumberOfQuestions = numberOfCategories * numberOfQuestions;
  const myIndexInRefsArray = totalNumberOfQuestions - myPosition;

  useEffect(() => {
    if (cardRef.current != null && !cardRefs.includes(cardRef.current)) {
      let refs = [...cardRefs];
      refs.push(cardRef.current);
      setCardRefs(refs);
    }
  }, [cardRef, cardRefs, setCardRefs]);

  const close = useCallback(() => {
    setActive(false);
    setAnyQuestionActive(false);
    setTimeout(() => {
      setZindex('0');
      setShowAnswer(false);
    }, 600);
  }, [setAnyQuestionActive]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    }
  }, [close]);

  const open = () => {
    setActive(true);
    setAnyQuestionActive(true);
    setZindex('3');
  }

  const show = () => {
    setShowAnswer(true);
  }

  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      open();
    } else if (event.key === 'ArrowUp') {
      handleArrowKeyPress(ArrowKeys.UP);
    } else if (event.key === 'ArrowDown') {
      handleArrowKeyPress(ArrowKeys.DOWN);
    } else if (event.key === 'ArrowRight') {
      handleArrowKeyPress(ArrowKeys.RIGHT);
    } else if (event.key === 'ArrowLeft') {
      handleArrowKeyPress(ArrowKeys.LEFT);
    }
  }

  const handleArrowKeyPress = (arrowKey: ArrowKey) => {
    let nextCardToFocusIndex = 0;
    if (arrowKey === ArrowKeys.UP) {
      nextCardToFocusIndex = myIndexInRefsArray + 1;
      if (nextCardToFocusIndex % numberOfQuestions === 0) {
        nextCardToFocusIndex -= numberOfQuestions;
      }
    } else if (arrowKey === ArrowKeys.DOWN) {
      nextCardToFocusIndex = myIndexInRefsArray - 1;
      if ((nextCardToFocusIndex + 1) % numberOfQuestions === 0) {
        nextCardToFocusIndex += numberOfQuestions;
      }
    } else if (arrowKey === ArrowKeys.LEFT) {
      nextCardToFocusIndex = myIndexInRefsArray+numberOfQuestions;
      if (nextCardToFocusIndex >= totalNumberOfQuestions) {
        nextCardToFocusIndex -=  totalNumberOfQuestions;
      }
    } else if (arrowKey === ArrowKeys.RIGHT) {
      nextCardToFocusIndex = myIndexInRefsArray-numberOfQuestions;
      if (nextCardToFocusIndex <= -1) {
        nextCardToFocusIndex +=  totalNumberOfQuestions;
      }
    }
    focus(nextCardToFocusIndex);
  }

  const focus = (index: number) => {
    const nextCardToFocus = cardRefs[index];
    if (nextCardToFocus != null) {
      nextCardToFocus.focus()
    }
  }

  const handleAnswerKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      show();
    }
  }

  return (
    <PerspectiveBox active={active} zindex={zindex}>
      <Card
        tabIndex={ isAnyQuestionActive ? -1 : myPosition}
        onKeyDown={handleCardKeyDown}
        active={active}
        categoryIndex={categoryIndex}
        questionIndex={questionIndex}
        zindex={zindex}
        ref={cardRef}
      >
        <Front categoryIndex={categoryIndex} onClick={open}>
          <Span>{value}</Span>
        </Front>
        <Back>
          <CloseButton tabIndex={active ? 1 : -1} categoryIndex={categoryIndex} onClick={close}>
            <Img src={cross_black} alt={'close button'}/>
          </CloseButton>
          <Title>{categoryName + ' - ' + value + ' ' + entity}</Title>
          <QuestionSpan>{question}</QuestionSpan>
          <AnswerSpan
            tabIndex={active ? 2 : -1}
            categoryIndex={categoryIndex}
            showAnswer={showAnswer}
            onClick={show}
            onKeyDown={handleAnswerKeyDown}
          >
            {showAnswer ? 'Svar: ' + answer : 'Se svar'}
          </AnswerSpan>
          <ButtonContainer>
            <SmileyButton tabIndex={active ? 3 : -1}>
              <Smiley src={smiley_wrong} alt={'Wrong smiley'} />
            </SmileyButton>
            <SmileyButton green tabIndex={active ? 4 : -1}>
              <Smiley src={smiley_correct} alt={'Correct smiley'} />
            </SmileyButton>
          </ButtonContainer>
        </Back>
      </Card>
    </PerspectiveBox>
  );
}
