import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from 'shared';
import question_mark from 'icons/question_mark.svg';
import cross_black from 'icons/cross_black.svg';

const Button = styled.button`
  position: absolute;
  left: 0;
  width: var(--5);
  height: var(--5);
  background: ${colors.BEKK_HVIT};
  border-radius: 50%;
  border: var(--2px) solid ${colors.OVERSKYET_KONTRAST};
  display: flex;
  justify-content: center;
  align-items: center;
  
  &:hover {
    cursor: pointer;
    transform: scale(1.2,1.2);
  }
`

const Img = styled.img`
  height: 120%;
`

const RulesWrapper = styled.div`
  position: absolute;
  top: -40px;
  height: 100vh;
  width: 100vw;
  background: hsl(0 0% 0% / 75%);
  z-index: 4;
`

const RulesCard = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 1164px;
  height: 720px;
  background: ${colors.BEKK_HVIT};
  border: var(--105) solid ${colors.OVERSKYET_KONTRAST};
  border-radius: var(--105);
  text-align: center;
`

const CloseButton = styled.button`
  display: block;
  height: 60px;
  width: 60px;
  background: none;
  border: none;
  position: absolute;
  top: 36px;
  right: 36px;
  padding: 0;
  margin: 0;
  cursor: pointer;
  z-index: 5;

  &:hover, &:active, &:focus-visible {
    outline: none;
    border-radius: 50%;
    background: ${colors.OVERSKYET_KONTRAST};
  }

  &:active {
    background: ${colors.OVERSKYET_AKTIV};
  }
`

const CloseImg = styled.img`
  position: absolute;
  top: var(--105);
  left: var(--105);
  width: 36px;
  height: 36px;
`

const TextWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  padding: 60px 96px;
  display: flex;
  flex-direction: column;
`

const Title = styled.h1`
  margin: 0;
  font-size: 5.25rem;
  font-weight: 100;
`

const RulesText = styled.ul`
  font-size: 1.5rem;
  text-align: left;
  margin-top: var(--5);
`

const ListItem = styled.li`
  margin-bottom: var(--3);
`

export const Rules = () => {
  const [show, setShow] = useState(false);

  const close = useCallback(() => {
    setShow(false);
  }, []);

  const showRules = () => {
    setShow(true);
  }

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


  const stopBubble = (e: any) => {
    e.stopPropagation();
  }

  return (
    <>
      <Button title={'Regler'} onClick={showRules}>
        <Img src={question_mark} alt={'rules button'}/>
      </Button>
      {show &&
      <RulesWrapper onClick={close}>
        <RulesCard onClick={stopBubble}>
          <CloseButton onClick={close}>
            <CloseImg src={cross_black} alt={'close button'}/>
          </CloseButton>
          <TextWrapper>
            <Title>
              Regler
            </Title>
            <RulesText>
              <ListItem>Lagene velger på rundgang hvilken kategori og vanskelighetsgrad de ønsker å åpne.</ListItem>
              <ListItem>Tallene på kortene representerer både poeng og antall slurker.</ListItem>
              <ListItem>Lavere tall = enklere spørsmål.</ListItem>
              <ListItem>Svarer laget riktig på spørsmålet får laget poeng (trykk grønn knapp) og de kan  dele ut slurkene til et annet lag.</ListItem>
              <ListItem>Svarer de feil får laget ikke poeng (trykk rød knapp) og de må drikke slurkene selv.</ListItem>
              <ListItem>
                Eks: Lag 1 velger Geografi 2, men svarer feil - De får 0 poeng og alle på laget må ta 2 slurker.
                Det blir så Lag 2 sin tur. Lag 2 velger Sport 8 og svarer riktig - De får 8 poeng og velger å gi 8 slurker til Lag 1.
                Alle på Lag 1 drikker 8 slurker. Osv.
              </ListItem>
            </RulesText>
          </TextWrapper>
        </RulesCard>
      </RulesWrapper>}
    </>
  );
}