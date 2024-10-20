import styled, { createGlobalStyle, keyframes } from "styled-components";

const bgColor = "#F3E2CB";
const darkRed = "#44291E";
const red = "#9C4E46";
const wallRed = "#A24D4C";
const darkGreen = "#678B80";
const green = "#7BA598";
const yellow = "#EEDB44";
const roofYellow = "#FDBB3B";
const roofYellowDarker = "#D0982E";
const blue = "#490CED";
const sunColor = "#CA502E";
const beige = "#F8DAB2";
const black = "#000";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Permanent+Marker');
  @import url('https://fonts.googleapis.com/css?family=Roboto+Mono');

  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    background: ${bgColor};
    display: flex;
    align-items: center;
    align-content: center;
  }

  @keyframes cloud1 {
    0% { transform: translate(-200px, -50px); }
    100% { transform: translate(-280px, -50px); }
  }
  @keyframes cloud2 {
    0% { transform: translate(60px, -120px); }
    100% { transform: translate(300px, -120px); }
  }
  @keyframes cloud3 {
    0% { transform: translate(210px, 0px); }
    100% { transform: translate(100px, 0px); }
  }

  @media only screen and (max-width: 1440px) {
    .headline {
      h1 {
        font-size: 4em;
      }
      h2 {
        font-size: 1em;
      }
    }
  }
`;
const sunRise = keyframes`
  from {
    transform: translateY(-80px); 
  }
  to {
    transform: translateY(-183px);
  }
`;

const alignX = `
  left: 50%;
  transform: translateX(-50%);
`;

const alignY = `
  top: 50%;
  transform: translateY(-50%);
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  align-content: center;
  position: absolute;
  bottom: 0;
  overflow: hidden;
  &:hover {
    .sun {
      transform: translateY(-200px);
    }
  }
`;

const Pedastal = styled.div`
  width: 1000px;
  height: 90px;
  background: white;
  position: relative;

  &-block1, &-block2 {
    width: 125px;
    height: 30px;
    background: ${wallRed};
    box-sizing: border-box;
    &::before {
      content: '';
      position: absolute;
      right: 0;
    }
  }

  &-block2 {
    width: 63px;
  }
`;

const Hall = styled.div`
  width: 520px;
  height: 60px;
  background: ${darkRed};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  z-index: 3;

  &-pillar {
    height: 100%;
    width: 16px;
    background: linear-gradient(90deg, #DA5447, ${red});
  }

  &-support {
    width: 40px;
    height: 12px;
    position: relative;
    &::before, &::after {
      content: '';
      width: 16px;
      height: 12px;
      background: linear-gradient(135deg, ${darkGreen} 50%, transparent 51%) no-repeat;
      position: absolute;
      top: 0;
    }
    &::before {
      left: 0;
      background-position: -2px 0;
    }
    &::after {
      right: 0;
      background-position: 2px 0;
    }
  }
`;

const LowerSupport = styled.div`
  width: 520px;
  height: 30px;
  background: ${green};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  border-left: 4px solid ${green};
  border-right: 4px solid ${green};
  z-index: 3;

  &-pillar {
    height: 100%;
    width: 16px;
    background: linear-gradient(90deg, #87C9B6, ${darkGreen});
  }
`;

const Ornaments = styled.div`
  width: 40px;
  height: 30px;
  display: flex;

  div {
    width: 20px;
    height: 30px;
    position: relative;

    &:first-child, &:last-child {
      &::before, &::after {
        content: '';
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: ${yellow};
        position: absolute;
      }
    }

    &:first-child {
      &::before {
        top: 6px;
        left: 11px;
      }
      &::after {
        bottom: 6px;
        left: 11px;
      }
    }

    &:last-child {
      &::before {
        top: 6px;
        right: 11px;
      }
      &::after {
        bottom: 6px;
        right: 11px;
      }
    }
  }
`;

const LowerRoof = styled.div`
  width: 376px;
  height: 40px;
  background: ${roofYellow};
  position: relative;
  z-index: 3;

  &::before, &::after {
    content: '';
    border-bottom: 40px solid ${roofYellow};
    position: absolute;
    bottom: 0;
  }

  &::before {
    border-left: 112px solid transparent;
    left: -112px;
  }

  &::after {
    border-right: 112px solid transparent;
    right: -112px;
  }

  div:first-child, div:last-child {
    display: inline-block;
    border-top: 15px solid ${roofYellowDarker};
    position: absolute;
    bottom: -15px;
  }

  div:first-child {
    border-left: 36px solid transparent;
    left: -112px;
  }

  div:last-child {
    border-right: 36px solid transparent;
    right: -112px;
  }
`;

const UpperSupport = styled.div`
  width: 376px;
  height: 20px;
  background: ${green};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  z-index: 3;

  .container {
    width: 296px;
    height: 20px;
    display: flex;
    align-self: center;
    flex-direction: row;
    justify-content: space-between;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .ornaments {
    div:first-child, div:last-child {
      &::after {
        display: none;
      }
      &::before {
        width: 6px;
        height: 6px;
      }
    }

    div:first-child {
      &::before {
        top: 7px;
        left: 8px;
      }
    }

    div:last-child {
      &::before {
        top: 7px;
        right: 8px;
      }
    }
  }
`;

const UpperRoof = styled.div`
  width: 520px;
  height: 90px;
  position: relative;
  z-index: 3;

  div:first-child, div:last-child {
    display: inline-block;
    border-top: 20px solid ${roofYellowDarker};
    position: absolute;
    bottom: -20px;
  }

  div:first-child {
    border-left: 72px solid transparent;
    left: 0px;
  }

  div:last-child {
    border-right: 72px solid transparent;
    right: 0px;
  }

  &-curved {
    width: 100px;
    height: 78px;
    background: ${bgColor};
    position: absolute;
    z-index: 1000;

    &:nth-child(2) {
      left: -102px;
      top: -2px;
      transform: rotate(3deg);
      border-radius: 0 0 100px 0;
    }

    &:nth-child(3) {
      right: -102px;
      top: -2px;
      transform: rotate(-3deg);
      border-radius: 0 0 0 100px;
    }
  }
`;

const SharedBoxes = styled.div`
  width: 8px;
  height: 8px;
  background: ${roofYellow};
  position: absolute;
`;

const RoofTop = styled.div`
  width: 264px;
  position: relative;
  z-index: 3;

  div {
    ${SharedBoxes};
    top: -8px;

    &:first-child, &:last-child {
      &::before, &::after {
        content: '';
        ${SharedBoxes};
      }
    }

    &:first-child {
      left: 0px;

      &::before {
        left: 8px;
      }

      &::after {
        left: 8px;
        bottom: 8px;
      }
    }

    &:last-child {
      right: 0px;

      &::before {
        right: 8px;
      }

      &::after {
        right: 8px;
        bottom: 8px;
      }
    }
  }
`;

const Sign = styled.div`
  width: 12px;
  height: 16px;
  background: ${blue};
  border: 4px solid ${red};
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const Trapezium = styled.div`
  border-bottom: 90px solid ${beige};
  border-right: 50px solid transparent;
  border-left: 50px solid transparent;
  width: 288px;
  position: absolute;
  bottom: 0;
  ${alignX};

  div {
    position: absolute;
    bottom: -90px;
    width: 20px;

    &::before {
      content: '';
      position: absolute;
      width: 20px;
    }

    &:first-child {
      left: 24px;
      border-bottom: 90px solid white;
      border-left: 40px solid transparent;

      &::before {
        border-top: 90px solid white;
        border-right: 40px solid transparent;
      }
    }

    &:last-child {
      right: 24px;
      border-bottom: 90px solid white;
      border-right: 40px solid transparent;

      &::before {
        border-top: 90px solid white;
        border-left: 40px solid transparent;
        right: 0;
      }
    }
  }
`;

const Wall = styled.div`
  width: 100%;
  height: 90px;
  background: ${wallRed};
  position: fixed;
  bottom: 0;
  z-index: -1;
  display: flex;    
  justify-content: center;

  &::before {
    content: '';
    width: 100%;
    max-width: 1240px;
    height: 140px;
    background: ${wallRed};
    position: absolute;
    bottom: 0;
    ${alignX};
  }

  &-roofing-bottom {
    width: 100%;
    height: 24px;
    background: ${roofYellow};
  }

  &-roofing-middle { 
    width: 1240px;
    height: 24px;
    background: ${roofYellow};
    position: absolute;
    top: -26px;

    &::before, &::after {
      content: '';
      border-bottom: 24px solid ${roofYellow};
      position: absolute;
    }

    &::before {
      border-left: 10px solid transparent;
      left: -10px;
    }

    &::after {
      border-right: 10px solid transparent;
      right: -10px;
    }
  }

  &-roofing-top {
    width: 1240px;
    height: 24px;
    background: ${roofYellow};
    position: absolute;
    top: -50px;

    &::before, &::after {
      content: '';
      border-bottom: 24px solid ${roofYellow};
      position: absolute;
    }

    &::before {
      border-left: 10px solid transparent;
      left: -10px;
    }

    &::after {
      border-right: 10px solid transparent;
      right: -10px;
    }
  }
`;

const Sun = styled.div`
  width: 400px;
  height: 400px;
  background: ${sunColor};
  border-radius: 200px;
  z-index: 1;
  position: absolute;
  transform: translateY(-100px);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 1s;
  animation: ${sunRise} 3s ease-out forwards;
`;

const Cloud = styled.div`
  background: white;
  position: relative;
  z-index: 2;
  

  &::before, &::after {
    background: white;
    display: block;
  }

  &cloud-01 {
    width: 88px;
    height: 32px;
    border-radius: 16px;
    transform: translate(-200px, -50px);
    animation: cloud1 50s ease-in-out infinite alternate;

    &::before {
      content: '';
      width: 50px;
      height: 50px;
      border-radius: 25px;
      display: block;
      transform: translate(22px, -25px);
    }
  }

  &-02 {
    width: 100px;
    height: 40px;
    border-radius: 20px;
    transform: translate(60px, -120px);
    animation: cloud2 40s ease-in-out infinite alternate;

    &::before {
      content: '';
      width: 46px;
      height: 46px;
      border-radius: 23px;
      transform: translate(38px, -23px);
    }

    &::after {
      content: '';
      width: 30px;
      height: 30px;
      border-radius: 15px;
      transform: translate(16px, -60px);
    }
  }

  &-03 {
    width: 70px;
    height: 24px;
    border-radius: 12px;
    transform: translate(210px, 0px);
    animation: cloud3 30s ease-in-out infinite alternate;

    &::before {
      content: '';
      width: 14px;
      height: 14px;
      border-radius: 7px;
      transform: translate(46px, -7px);
    }

    &::after {
      content: '';
      width: 16px;
      height: 16px;
      border-radius: 8px;
      top: 0;
      transform: translate(12px, -50px);
    }

    div {
      width: 30px;
      height: 30px;
      background: white;
      border-radius: 15px;
      display: block;
      transform: translate(24px, -30px);
    }
  }
`;

const Copy = styled.div`
  font-family: 'Permanent Marker', cursive;
  font-size: 8em;
  color: ${bgColor};
  padding-bottom: 60px;
`;

const Headline = styled.div`
  text-align: center;
  position: relative;
  z-index: 4;   
  top: -140px;

  h2 {
    font-family: 'Roboto Mono', monospace;
    font-size: 1.25em;
    color: #2b2b2b;
  }
`;

export {
  GlobalStyle,
  Wrapper,
  Pedastal,
  Hall,
  LowerSupport,
  Ornaments,
  LowerRoof,
  UpperSupport,
  UpperRoof,
  RoofTop,
  Sign,
  Trapezium,
  Wall,
  Sun,
  Cloud,
  Copy,
  Headline
};