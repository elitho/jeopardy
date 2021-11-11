import React from 'react';
import styled from 'styled-components';
import { GameBoard, ScoreBoard, TurnHeader } from 'components';

const Text = styled.p`
  font-size: 2rem;
  margin: 0 auto;
  padding: 50% var(--2) 0;
  width: 100%;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--2);
  align-items: center;
  position: relative;
`

export const MainPage = () => {
  const isMobileView = window.innerWidth < 1000;

  return (
    <>
      {isMobileView ?
        <Text>
          This app is not for mobile. Open on desktop.
        </Text>
        : (<Wrapper>
          <TurnHeader />
          <GameBoard />
          <ScoreBoard />
        </Wrapper>)}
    </>
  );
}