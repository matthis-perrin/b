// @matthis/skip-file:AUTHENTICATION:not:true
import {FC, FormEvent, useCallback, useState} from 'react';
import {styled} from 'styled-components';

import {Button} from '@shared-web/components/core/button';
import {Input} from '@shared-web/components/core/input';
import {notifyError} from '@shared-web/lib/notification';

import {Tile} from '@src/components/tile';
import {apiCall} from '@src/lib/api';
import {setUser} from '@src/stores/user_store';

interface LoginPageProps {}

export const LoginPage: FC<LoginPageProps> = () => {
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const handleSubmit = useCallback(
    (evt: FormEvent) => {
      evt.preventDefault();
      evt.stopPropagation();
      if (id === undefined || id.length === 0 || password === undefined || password.length === 0) {
        return;
      }
      setLoading(true);
      apiCall('POST /login', {id, password})
        .then(setUser)
        .catch(notifyError)
        .finally(() => setLoading(false));
    },
    [id, password]
  );

  return (
    <Wrapper>
      <Tile>
        <Form onSubmit={handleSubmit}>
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
            type="submit"
            loading={loading}
            expand
            disabled={
              id === undefined || id.length === 0 || password === undefined || password.length === 0
            }
          >{`LOGIN`}</Button>
        </Form>
      </Tile>
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

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
