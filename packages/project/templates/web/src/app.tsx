import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {styled} from 'styled-components';

import {HomePage} from '@src/home_page';

export const App: React.FC = () => {
  return (
    <Wrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </Wrapper>
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
