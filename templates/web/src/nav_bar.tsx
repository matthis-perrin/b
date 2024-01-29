import {FC} from 'react';
import {styled} from 'styled-components';
import {useLocation} from 'wouter';

import {UnthemedNavLink} from '@shared-web/components/core/button';

interface NavBarProps {}

export const NavBar: FC<NavBarProps> = () => {
  const [location] = useLocation();
  return (
    <Wrapper>
      <StyledNavLink $active={location === '/'} to="/">
        Home
      </StyledNavLink>
      <StyledNavLink $active={location === '/test-page'} to="/test-page">
        Test
      </StyledNavLink>
    </Wrapper>
  );
};

NavBar.displayName = 'NavBar';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  height: 64px;
  flex-shrink: 0;
  background: #eeeeee;
  box-shadow: 0px 4px 10px -10px black;
`;

const StyledNavLink = styled(UnthemedNavLink)<{$active: boolean}>`
  color: #000000cc;
  padding: 8px 16px;
  border-radius: 4px;
  ${p => p.$active && 'background: #00000011;'}
  &:hover {
    ${p => !p.$active && 'background: #00000005;'}
  }
`;
