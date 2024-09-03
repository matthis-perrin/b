import {useCallback} from 'react';
import {styled} from 'styled-components';

import {Button} from '@shared-web/components/core/button';
import {showSuccess} from '@shared-web/components/core/notifications';
import {sleep} from '@shared-web/lib/time_utils';

export const HomePage: React.FC = () => {
  const handleClick = useCallback(async () => {
    await sleep(1000);
    showSuccess('WORLD');
  }, []);

  return (
    <Wrapper>
      <div>Home Page</div>
      <Button onClickAsync={handleClick}>{`HELLO`}</Button>
    </Wrapper>
  );
};
HomePage.displayName = 'HomePage';

const Wrapper = styled.div`
  flex-grow: 1;
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: safe center;
  &:first-child {
    margin-top: auto;
  }
  &:last-child {
    margin-bottom: auto;
  }
`;
