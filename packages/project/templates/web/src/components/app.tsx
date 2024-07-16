import {styled} from 'styled-components';
import {Route} from 'wouter';

import {Modal} from '@shared-web/components/core/modal';

import {HomePage} from '@src/components/home_page';
// @matthis/start:AUTHENTICATION:true
import {LoginPage} from '@src/components/login_page';
// @matthis/end
import {NavBar} from '@src/components/nav_bar';
import {TestPage} from '@src/components/test_page';
// @matthis/start:AUTHENTICATION:true
import {useUser} from '@src/stores/user_store';
// @matthis/end

export const App: React.FC = () => {
  // @matthis/start:AUTHENTICATION:true
  const user = useUser();

  const routes = user ? (
    <>
      <Route path="/" component={HomePage} />
      <Route path="/test-page" component={TestPage} />
    </>
  ) : (
    <Route path="*" component={LoginPage} />
  );
  // @matthis/end
  // @matthis/start:AUTHENTICATION:not:true
  const routes = (
    <>
      <Route path="/" component={HomePage} />
      <Route path="/test-page" component={TestPage} />
    </>
  );
  // @matthis/end

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
