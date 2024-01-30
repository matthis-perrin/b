import {useCallback} from 'react';
import {styled} from 'styled-components';

import {Button} from '@shared-web/components/core/button';
import {showSuccess} from '@shared-web/components/core/notifications';
import {sleep} from '@shared-web/lib/time_utils';

import {apiCall} from '@src/lib/api';
import {updateDummyCounter, useDummyCounter} from '@src/stores/dummy_counter_store';

export const HomePage: React.FC = () => {
  const dummyCounter = useDummyCounter();

  const handleClick = useCallback(async () => {
    await sleep(1000);
    const res = await apiCall('GET /test', {val: '1337'});
    console.log(res);
    updateDummyCounter(current => current + 1);
    showSuccess('Success');
  }, []);

  return (
    <Wrapper>
      <div>Home Page</div>
      <Button onClickAsync={handleClick}>{`BUTTON [${dummyCounter}]`}</Button>
    </Wrapper>
  );
};
HomePage.displayName = 'HomePage';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
