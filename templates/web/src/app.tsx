import {styled} from 'styled-components';
import {Route} from 'wouter';

import {TestPage} from '@src/test_page';
import {HomePage} from '@src/home_page';
import {NavBar} from '@src/nav_bar';

export const App: React.FC = () => {
  return (
    <Route path="/" nest>
      <Wrapper>
        <NavBar />
        <Route path="/" component={HomePage} />
        <Route path="/test" component={TestPage} />
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
