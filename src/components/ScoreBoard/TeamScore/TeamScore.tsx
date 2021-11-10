import styled, { keyframes } from 'styled-components';
import { colorMap, colors, contrastColorMap } from 'shared';

const Wrapper = styled.div<{ team: number }>`
  background: ${({team}) => colorMap[team + 5]};
  border: 2px solid ${({team}) => contrastColorMap[team + 5]};
  box-shadow: 0 5px ${colors.SKYGGE};
  border-radius: var(--1X);
  padding: var(--2X);
  text-align: center;
  font-family: var(--din-medium);
  font-size: 1.5rem;
  width: 164px;
`
const TeamName = styled.span<{ team: number }>`
  display: block;
  border-bottom: 2px solid ${({team}) => contrastColorMap[team + 5]};
  width: fit-content;
  margin: 0 auto var(--1X) auto;
  
`

const pointsAnimation = keyframes`
  0% { transform: scale(1); }
  25% { transform: scale(0.8); }
  50% { transform: scale(2.3); }
  100% { transform: scale(1); }
`

const Score = styled.span`
  display: block;
  animation: ${pointsAnimation} 1.5s;
  font-size: 2.5rem;
`

type Props = {
  score: number,
  team: number,
}

export const TeamScore = ({score, team}: Props) => {
  return (
    <Wrapper team={team}>
      <TeamName team={team}>{'Lag ' + (team + 1)}</TeamName>
      <Score key={score}>{score}</Score>
    </Wrapper>
  );
}