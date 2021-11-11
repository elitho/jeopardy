import styled, { keyframes } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { colorMap, colors, contrastColorMap, turn } from 'shared';

const calcFromColor = (team: number) => {
  if (team === 1) {
    return team + 7;
  } else {
    return team + 3;
  }
}

const test = (team: number) => keyframes`
  0% { background-color: ${colorMap[calcFromColor(team)]}; border-color: ${contrastColorMap[calcFromColor(team)]}; }
  100% { background-color: ${colorMap[team + 4]}; border-color: ${contrastColorMap[team + 4]};}
`

const Wrapper = styled.h1<{ team: number }>`
  color: ${colors.BEKK_SORT};
  background-color: ${({team}) => colorMap[team + 4]};
  border: 2px solid ${({team}) => contrastColorMap[team + 4]};
  border-radius: var(--1);
  text-align: center;
  padding: var(--1) var(--8);
  box-shadow: 0 6px ${colors.SKYGGE};
  margin: 0;
  font-size: 4.5rem;
  min-width: 440px;
  animation: ${({team}) => test(team)} 1.5s;
`

const Span = styled.span`
  display: block;
`

export const TurnHeader = () => {
  const turnState = useRecoilValue(turn);
  return (
    <Wrapper key={turnState} team={turnState}>
      <Span>{`Lag ${turnState}`}</Span>
    </Wrapper>
  );
}