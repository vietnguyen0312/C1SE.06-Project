import React from 'react';
  import {
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
} from './style';

const Error403 = () => {

  return (
    <>
      <GlobalStyle />
      <div className="error403-container" style={{ cursor: 'default', userSelect: 'none' }}>

        <Wrapper>
          <Pedastal>
            <div className="pedastal-block1" />
            <div className="pedastal-block2" />
            <Trapezium>
              <div />
              <div />
            </Trapezium>
          </Pedastal>
          <Hall>
            <div className="hall-pillar" />
            <div className="hall-support" />
            <div className="hall-pillar" />
            <div className="hall-support" />
            <div className="hall-pillar" />
            <div className="hall-support" />
            <div className="hall-pillar" />
            <div className="hall-support" />
            <div className="hall-pillar" />
            <div className="hall-support" />
            <div className="hall-pillar" />
            <div className="hall-support" />
            <div className="hall-pillar" />
            <div className="hall-support" />
            <div className="hall-pillar" />
            <div className="hall-support" />
            <div className="hall-pillar" />
            <div className="hall-support" />
            <div className="hall-pillar" />
          </Hall>
          <LowerSupport>
            <div className="lower-support-pillar" />
            <Ornaments>
              <div />
              <div />
            </Ornaments>
            <div className="lower-support-pillar" />
            <Ornaments>
              <div />
              <div />
            </Ornaments>
            <div className="lower-support-pillar" />
            <Ornaments>
              <div />
              <div />
            </Ornaments>
            <div className="lower-support-pillar" />
            <Ornaments>
              <div />
              <div />
            </Ornaments>
            <div className="lower-support-pillar" />
            <Ornaments>
              <div />
              <div />
            </Ornaments>
            <div className="lower-support-pillar" />
            <Ornaments>
              <div />
              <div />
            </Ornaments>
            <div className="lower-support-pillar" />
            <Ornaments>
              <div />
              <div />
            </Ornaments>
            <div className="lower-support-pillar" />
            <Ornaments>
              <div />
              <div />
            </Ornaments>
            <div className="lower-support-pillar" />
            <Ornaments>
              <div />
              <div />
            </Ornaments>
            <div className="lower-support-pillar" />
          </LowerSupport>
          <LowerRoof>
            <div />
            <div />
          </LowerRoof>
          <UpperSupport>
            <div className="container">
              <div className="lower-support-pillar" />
              <div className="lower-support-pillar" />
              <div className="lower-support-pillar" />
              <div className="lower-support-pillar" />
              <div className="lower-support-pillar" />
              <div className="lower-support-pillar" />
            </div>
            <Ornaments><div /><div /></Ornaments>
            <Ornaments><div /><div /></Ornaments>
            <Ornaments><div /><div /></Ornaments>
            <Ornaments><div /><div /></Ornaments>
            <Ornaments><div /><div /></Ornaments>
            <Ornaments><div /><div /></Ornaments>
            <Ornaments><div /><div /></Ornaments>
            <Sign />
          </UpperSupport>
          <UpperRoof>
            <div />
            <svg width="520px" height="90px">
              <path d="M495.689265,72.9065145 L520,90 L0,90 L24.3069308,72.9091893 L45.9698498,74.0444947 C88.9890231,76.2990341 125.690619,43.2527689 127.945158,0.233595624 L127.687016,0.220066965 L128,0 L392,0 L392.30918,0.217392187 L392,0.233595624 C394.254539,43.2527689 430.956135,76.2990341 473.975308,74.0444947 L495.689265,72.9065145 Z" id="Combined-Shape" fill="#FDBB3B" />
            </svg>
            <div />
          </UpperRoof>
          <RoofTop>
            <div />
            <div />
          </RoofTop>
          <Cloud className="cloud-01" />
          <Cloud className="cloud-02" />
          <Cloud className="cloud-03"></Cloud>
          <Sun>
            <Copy>403</Copy>
          </Sun>
          <Headline>
            <h1>Forbidden City</h1>
            <h2>🙅‍♂️ Bạn không có quyền truy cập vào vùng này ❌</h2>
          </Headline>
        </Wrapper>
        <Wall>
          <div className="wall-roofing-bottom" />
          <div className="wall-roofing-middle" />
          <div className="wall-roofing-top" />
        </Wall>
      </div>
    </>
  );
}

export default Error403;