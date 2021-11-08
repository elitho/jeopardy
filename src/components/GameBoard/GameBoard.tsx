import styled from 'styled-components';
import { CategoryColumn } from 'components/index';
import { testGameObject } from 'shared';
import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { closeAll } from 'shared/questionCardAtoms';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  max-width: 1600px;
  justify-content: center;
  gap: var(--2X);
  text-align: center;
`

export const GameBoard = () => {
  const [, setCloseAll] = useRecoilState(closeAll);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (containerRef && !containerRef.current?.contains(event.target as Node)) {
        setCloseAll(true);
      }
    };
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
    }
  }, [setCloseAll]);

  return (
    <Container ref={containerRef}>
      {testGameObject.map((category, index) => (
        <CategoryColumn
          key={index}
          category={category}
          categoryIndex={index}
          numberOfCategories={testGameObject.length}
        />
      ))}
    </Container>
  );
}