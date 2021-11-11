import { useRecoilValue } from 'recoil';
import { score } from 'shared';
import styled from 'styled-components';
import { TeamScore } from 'components/ScoreBoard/TeamScore';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--2);
  position: absolute;
  right: -244px;
  top: 22%
`

export const ScoreBoard = () => {
  const scoreArray = useRecoilValue(score);

  return (
    <Wrapper>
      {scoreArray.map((score, index) => (
        <TeamScore score={score} team={index}/>
        ))}
    </Wrapper>
  );
}