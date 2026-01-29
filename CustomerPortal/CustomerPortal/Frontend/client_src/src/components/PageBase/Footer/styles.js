import styled from 'styled-components';

export const FooterContainer = styled.div`
  width: 100%;
  min-height: 300px;
  background: ${props => props.theme.igtBlueDark};
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  padding: 25px;
  color: ${props => props.theme.brandWhite};
`;

export const LogoContainer = styled.div`
  width: 100%;

  & > img {
    width: 85px;
  }
  display: flex;
  justify-content: flex-end;

  @media ${props => props.theme.mobileL} {
    justify-content: center;
  }
`;

export const DisclaimerContainer = styled.div`
  width: 100%;
  font-size: 0.75em;

  & > p {
    width: 50%;

    @media ${props => props.theme.mobileL} {
      width: 100%;
    }
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
`;

export const LinkContainer = styled.div`
  width: 100%;
  border-bottom: 0.5px solid ${props => props.theme.igtLightGray};
  padding-bottom: 14px;
  margin-bottom: 14px;

  @media ${props => props.theme.mobileL} {
    text-align: center;
  }

  & > a {
    margin-right: 10px;
    font-weight: normal;
    font-size: 0.85em;
    transition: 0.2s;

    &:hover {
      transition: 0.2s;
      color: ${props => props.theme.igtOrange};
    }
  }
`;

export const CopywriteLogoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 0.75em;
`;

export const SocialLinks = styled.div`
  display: flex;

  & > a {
    margin-left: 10px;
    font-size: 1.3em;
  }
`;
