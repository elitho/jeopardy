import React, { createRef, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import cross_black from 'icons/cross_black.svg';
import smiley_correct from 'icons/happy_smiley.svg'
import smiley_wrong from 'icons/sad_smiley.svg'
import { ArrowKey, ArrowKeys, Question } from 'types';
import {
  activeColorMap,
  anyQuestionActive,
  cardRefsArray,
  closeAll,
  colorMap,
  colors,
  contrastColorMap,
  score,
  turn
} from 'shared';

const PerspectiveBox = styled.div<{ active: boolean, zIndex: number }>`
  height: 120px;
  width: 194px;
  perspective: 1000px;
  z-index: ${({zIndex}) => zIndex};
`

const Card = styled.div<{ active: boolean, deactivate: boolean, categoryIndex: number, questionIndex: number, zIndex: number }>`
  font-weight: 100;
  height: 100%;
  width: 100%;
  background: ${({categoryIndex}) => (colorMap[categoryIndex])};
  transition-duration: .6s;
  transition-timing-function: cubic-bezier(0.68, -0.25, 0.27, 1.25);
  transition-property: border-radius, box-shadow, transform;
  transform-style: preserve-3d;
  position: relative;
  cursor: ${({active}) => (active ? 'auto' : 'pointer')};
  border-radius: ${({active}) => (active ? 'var(--2px)' : 'var(--1)')};
  border: 2px solid ${({categoryIndex}) => (contrastColorMap[categoryIndex])};
  box-shadow: ${({active}) => (active ? '0 var(--2px) ' + colors.SKYGGE : '0 6px ' + colors.SKYGGE)};
  transform: ${({active, deactivate, categoryIndex, questionIndex}) => 
          transformCard(active, deactivate, categoryIndex, questionIndex)};

  &:hover, &:focus-visible {
    background: ${({active, zIndex, categoryIndex}) => backgroundColor(active, zIndex, categoryIndex)};
    border-color: ${({active, zIndex, categoryIndex}) => borderColor(active, zIndex, categoryIndex)};
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
  border-radius: var(--1);

  &:active {
    background: ${({categoryIndex}) => (activeColorMap[categoryIndex])};
  }
`

const ValueSpan = styled.span`
  font-size: 4.5rem;
  font-family: var(--newzald);
`

const Back = styled.div`
  padding: 10px var(--2);
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // translateZ 1px fixed bug i was having in chrome on mac with backface-visibility
  transform: rotateY(180deg) translateZ(1px);
`

const CloseButton = styled.button<{ categoryIndex: number, hide: boolean }>`
  display: ${({hide}) => hide ? 'none' : 'block'};
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

const AnswerSpan = styled.span<{ showAnswer: boolean, categoryIndex: number, hideBorder: boolean }>`
  font-size: 0.5rem;
  width: fit-content;
  margin: 0 auto;
  border-bottom: ${({categoryIndex, hideBorder}) => (hideBorder ? 'none' : '1px solid ' + colorMap[categoryIndex])};

  &:hover, &:focus-visible {
    outline: none;
    cursor: ${({showAnswer}) => (showAnswer ? 'default' : 'pointer')};
    border-bottom: ${({showAnswer, categoryIndex, hideBorder}) => (hideBorder ? 'none' : 
            (showAnswer ? '1px solid ' + colorMap[categoryIndex] : '1px solid ' + contrastColorMap[categoryIndex]))};
  }

  &:active {
    border-color: ${({categoryIndex}) => (activeColorMap[categoryIndex])};
  }
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: var(--1);
`

const SmileyButton = styled.button<{ green?: boolean, hide: boolean }>`
  opacity: ${({hide}) => hide ? '0' : '1'};
  margin: 0;
  padding: 0;
  background: none;
  height: var(--2);
  cursor: ${({hide}) => hide ? 'default' : 'pointer'};
  border: var(--1px) solid ${({green}) => (green ? colors.GRØNN_KONTRAST : colors.SOLNEDGANG_KONTRAST)};

  &:hover, &:focus-visible {
    outline: none;
    border: var(--1px) solid ${({green}) => (green ? colors.GRØNN_AKTIV : colors.SOLNEDGANG_AKTIV)};
  }

  &:active {
    border: var(--1px) solid ${({green}) => (green ? colors.GRØNN_SMILEY_AKTIV : colors.SOLNEDGANG_SMILEY_AKTIV)};
  }
`

const Smiley = styled.img`
  height: 100%;
  width: 100%;
`

const transformCard = (active: boolean, deactivate: boolean, categoryIndex: number, questionIndex: number) => {
  if (active) {
    return `rotateY(${categoryIndex < 3 ? '180deg' : '-180deg'}) ` +
      'scale(6,6)' +
      `translateX(${((36.7 - (categoryIndex * 18.3)) * -1)}%) ` +
      `translateY(${(33.8 - (questionIndex * 18.9))}%)`;
  } else if (deactivate) {
    return `rotateY(${categoryIndex < 3 ? '180deg' : '-180deg'})`;
  } else {
    return 'none';
  }
}

const backgroundColor = (active: boolean, zIndex: number, categoryIndex: number) => {
  if (active) {
    return colorMap[categoryIndex];
  } else if (zIndex === 0) {
    return contrastColorMap[categoryIndex];
  } else {
    return colorMap[categoryIndex];
  }
}

const borderColor = (active: boolean, zIndex: number, categoryIndex: number) => {
  if (active) {
    return contrastColorMap[categoryIndex];
  } else if (zIndex === 0) {
    return colorMap[categoryIndex];
  } else {
    return contrastColorMap[categoryIndex];
  }
}

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
  const [closeAllCards, setCloseAll] = useRecoilState(closeAll);
  const [turnState, setTurn] = useRecoilState(turn);
  const [scoreState, setScore] = useRecoilState(score);
  const [active, setActive] = useState(false);
  const [deactivated, setDeactivated] = useState(false);
  const [zIndex, setZindex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [test, setTest] = useState('false');
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
    setCloseAll(false);
    setActive(false);
    setAnyQuestionActive(false);
    if (active) {
      setTimeout(() => {
        setZindex(0);
        if (!deactivated) {
          setShowAnswer(false);
        }
      }, 600);
    }
  }, [setAnyQuestionActive, active, setCloseAll, deactivated]);

  useEffect(() => {
    if (closeAllCards) {
      close();
    }
  }, [close, closeAllCards]);

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
    setCloseAll(false);
    setActive(true);
    setAnyQuestionActive(true);
    setZindex(3);
  }

  const show = () => {
    setShowAnswer(true);
  }

  const deactivateCard = () => {
    setDeactivated(true);
    setCloseAll(false);
    setActive(false);
    setAnyQuestionActive(false);
    if (active) {
      setTimeout(() => {
        setZindex(0);
      }, 600);
    }
  }

  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      open();
    } else if (!active && event.key === 'ArrowUp') {
      handleArrowKeyPress(ArrowKeys.UP);
    } else if (!active && event.key === 'ArrowDown') {
      handleArrowKeyPress(ArrowKeys.DOWN);
    } else if (!active && event.key === 'ArrowRight') {
      handleArrowKeyPress(ArrowKeys.RIGHT);
    } else if (!active && event.key === 'ArrowLeft') {
      handleArrowKeyPress(ArrowKeys.LEFT);
    }
  }

  const handleAnswerKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      show();
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
      nextCardToFocusIndex = myIndexInRefsArray + numberOfQuestions;
      if (nextCardToFocusIndex >= totalNumberOfQuestions) {
        nextCardToFocusIndex -= totalNumberOfQuestions;
      }
    } else if (arrowKey === ArrowKeys.RIGHT) {
      nextCardToFocusIndex = myIndexInRefsArray - numberOfQuestions;
      if (nextCardToFocusIndex <= -1) {
        nextCardToFocusIndex += totalNumberOfQuestions;
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

  const nextTurn = (assignPoints: boolean, points: number) => {
    // get from somewhere else later
    const numberOfTeams = 4;
    const teamScoreIndex = turnState - 1;

    if (assignPoints) {
      const prevScore = scoreState[teamScoreIndex];
      let clone = [...scoreState];
      clone[teamScoreIndex] = prevScore + points;
      setScore(clone);
    }
    const nextTurn = (turnState % numberOfTeams) + 1;
    setTurn(nextTurn);
    const ting = `Lag ${turnState} svarte ${assignPoints ? 'RIKTIG' : 'FEIL'}`
    setTest(ting);
    deactivateCard();
  }

  return (
    <PerspectiveBox active={active} zIndex={zIndex}>
      <Card
        tabIndex={isAnyQuestionActive ? -1 : myPosition}
        onKeyDown={handleCardKeyDown}
        active={active}
        deactivate={deactivated}
        categoryIndex={categoryIndex}
        questionIndex={questionIndex}
        zIndex={zIndex}
        ref={cardRef}
      >
        <Front categoryIndex={categoryIndex} onClick={open}>
          <ValueSpan>{value}</ValueSpan>
        </Front>
        <Back onClick={deactivated && !active ? open : undefined}>
          <CloseButton
            hide={deactivated && !active}
            tabIndex={active ? 1 : -1}
            categoryIndex={categoryIndex}
            onClick={close}
          >
            <Img src={cross_black} alt={'close button'}/>
          </CloseButton>
          <Title>{categoryName + ' - ' + value + ' ' + entity}</Title>
          <QuestionSpan>{question}</QuestionSpan>
          <AnswerSpan
            tabIndex={active ? 2 : -1}
            categoryIndex={categoryIndex}
            showAnswer={showAnswer}
            hideBorder={deactivated}
            onClick={show}
            onKeyDown={handleAnswerKeyDown}
          >
            {showAnswer ? 'Svar: ' + answer : 'Se svar'}
          </AnswerSpan>
          <ButtonContainer>
            <SmileyButton hide={deactivated} onClick={!deactivated ? () => nextTurn(false, value) : undefined} tabIndex={active ? 3 : -1}>
              <Smiley draggable={false} src={smiley_wrong} alt={'Wrong smiley'}/>
            </SmileyButton>
            <SmileyButton green hide={deactivated} onClick={!deactivated ? () => nextTurn(true, value) : undefined} tabIndex={active ? 4 : -1}>
              <Smiley draggable={false} src={smiley_correct} alt={'Correct smiley'}/>
            </SmileyButton>
            {deactivated && <span>
              {test}
            </span>}
          </ButtonContainer>
        </Back>
      </Card>
    </PerspectiveBox>
  );
}
