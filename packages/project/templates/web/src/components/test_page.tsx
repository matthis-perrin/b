import {useCallback} from 'react';
import {styled} from 'styled-components';

import {Button} from '@shared-web/components/core/button';
import {showSuccess} from '@shared-web/components/core/notifications';
import {sleep} from '@shared-web/lib/time_utils';

export const TestPage: React.FC = () => {
  const handleClick = useCallback(async () => {
    await sleep(1000);
    showSuccess('BAR');
  }, []);

  return (
    <Wrapper>
      <div>Test Page</div>
      <Button onClickAsync={handleClick}>{`FOO`}</Button>
    </Wrapper>
  );
};
TestPage.displayName = 'TestPage';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
