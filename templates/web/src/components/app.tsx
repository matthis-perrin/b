import {styled} from 'styled-components';
import {Route} from 'wouter';

import {Modal} from '@shared-web/components/core/modal';

import {HomePage} from '@src/components/home_page';
import {LoginPage} from '@src/components/login_page';
import {NavBar} from '@src/components/nav_bar';
import {TestPage} from '@src/components/test_page';
import {useUser} from '@src/stores/user_store';

export const App: React.FC = () => {
  const {isConnected} = useUser();

  const routes = isConnected ? (
    <>
      <Route path="/" component={HomePage} />
      <Route path="/test-page" component={TestPage} />
    </>
  ) : (
    <Route path="*" component={LoginPage} />
  );

  return (
    <Route path="/" nest>
      <>
        <Wrapper>
          <NavBar />
          {routes}
        </Wrapper>
        <Modal />
      </>
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
