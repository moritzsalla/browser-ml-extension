import * as React from "react";
import styled from "styled-components";

const Wrapper = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 0.7rem;
  overflow: hidden;
  line-height: 1.1;
  margin: 0 !important;
  padding: 1rem !important;
  box-sizing: border-box;
  font-family: "IM Fell English", serif;
`;

const Footer = () => (
  <Wrapper>
    By Moritz Salla, 2020.
    <br />
    moritzsalla.info.
  </Wrapper>
);

export default Footer;
