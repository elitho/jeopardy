import { GameBoard } from "components";
import styled from "styled-components";

const Div = styled.div`
  margin: 0 auto;
  padding-top: 50%;
  width: fit-content;
`

export const MainPage = () => {
  const isMobileView = window.innerWidth < 1000;

  return (
    <>
      {isMobileView ? <Div>Kom deg på en pc, Sander</Div> : <GameBoard />}
    </>
  );
}