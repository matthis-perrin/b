import {FC, useCallback, useState} from 'react';
import {styled} from 'styled-components';

import {Button} from '@shared-web/components/core/button';
import {Input} from '@shared-web/components/core/input';

import {apiCall} from '@src/lib/api';
import {setUser} from '@src/stores/user_store';

interface LoginPageProps {}

export const LoginPage: FC<LoginPageProps> = () => {
  const [id, setId] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const handleClick = useCallback(async () => {
    if (id === undefined || id.length === 0 || password === undefined || password.length === 0) {
      return;
    }
    await apiCall('POST /login', {id, password});
    setUser({isConnected: true});
  }, [id, password]);

  return (
    <Wrapper>
      <div>
        <Input value={id} syncState={setId} label="USERNAME" width="100%" autoFocus />
      </div>
      <div>
        <Input
          type="password"
          value={password}
          syncState={setPassword}
          label="PASSWORD"
          width="100%"
        />
      </div>
      <Button
        onClickAsync={handleClick}
        expand
        disabled={
          id === undefined || id.length === 0 || password === undefined || password.length === 0
        }
        keyboardSubmit
      >{`LOGIN`}</Button>
    </Wrapper>
  );
};

LoginPage.displayName = 'LoginPage';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  margin-top: 32px;
`;
