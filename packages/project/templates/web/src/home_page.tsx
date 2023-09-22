import {useEffect} from 'react';
import {styled} from 'styled-components';

import {apiCall} from '@src/lib/api';

export const HomePage: React.FC = () => {
  useEffect(() => {
    apiCall('GET /test', {val: '1337'}).then(console.log).catch(console.error);
  }, []);
  return <Wrapper>Hello</Wrapper>;
};
HomePage.displayName = 'HomePage';

const Wrapper = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
`;
