import { GameBoard } from 'components';
import styled from 'styled-components';

const Text = styled.p`
  font-size: 2rem;
  margin: 0 auto;
  padding: 50% var(--2X) 0;
  width: 100%;
`

export const MainPage = () => {
  const isMobileView = window.innerWidth < 1000;

  return (
    <>
      {isMobileView ?
        <Text>
          This app is not for mobile. Open on desktop.
        </Text>
        : <GameBoard />}
    </>
  );
}