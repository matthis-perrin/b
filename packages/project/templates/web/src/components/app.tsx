import {styled} from 'styled-components';
import {Route} from 'wouter';

import {HomePage} from '@src/components/home_page';
import {NavBar} from '@src/components/nav_bar';
import {TestPage} from '@src/components/test_page';

export const App: React.FC = () => {
  return (
    <Route path="/" nest>
      <Wrapper>
        <NavBar />
        <Route path="/" component={HomePage} />
        <Route path="/test-page" component={TestPage} />
      </Wrapper>
    </Route>
  );
};
App.displayName = 'App';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #ccc;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;
