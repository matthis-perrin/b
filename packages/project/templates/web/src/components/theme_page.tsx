import {useCallback} from 'react';
import {styled} from 'styled-components';

import {Button, NavLink} from '@shared-web/components/core/button';
import {Calendar} from '@shared-web/components/core/calendar';
import {Checkbox} from '@shared-web/components/core/checkbox';
import {Input} from '@shared-web/components/core/input';
import {LoadingIndicator} from '@shared-web/components/core/loading_indicator';
import {Radios} from '@shared-web/components/core/radios';
import {Textarea} from '@shared-web/components/core/textarea';

import {darkTheme, getThemeData, lightTheme, setThemeData} from '@src/theme';

export const ThemePage: React.FC = () => {
  const handleThemeClick = useCallback(() => {
    setThemeData(getThemeData().main.dark ? lightTheme : darkTheme);
  }, []);
  return (
    <Wrapper>
      <Button onClick={handleThemeClick}>THEME</Button>
      <Row>
        <Button>ACTIVE</Button>
        <Button disabled>DISABLED</Button>
        <Button loading>LOADING</Button>
      </Row>
      <Row>
        <NavLink to={'/theme'}>ACTIVE</NavLink>
        <NavLink to={'/theme'} disabled>
          DISABLED
        </NavLink>
        <NavLink to={'/theme'} loading>
          LOADING
        </NavLink>
      </Row>
      <Row>
        <Checkbox checked>Checked</Checkbox>
        <Checkbox>Not checked</Checkbox>
        <Checkbox disabled>Disabled</Checkbox>
      </Row>
      <Row>
        <Input value="" placeholder="Empty" />
        <Input value="Value" />
        <Input value="Value and label" label={'Label'} />
        <Input value="Disabled" label={'Disabled'} disabled />
      </Row>
      <Row>
        <Textarea value="" placeholder="Empty" />
        <Textarea value="Value" />
        <Textarea value="Value and label" label={'Label'} />
        <Textarea value="Disabled" label={'Disabled'} disabled />
      </Row>
      <Row>
        <LoadingIndicator />
      </Row>
      <Row>
        <Radios
          column
          value={1}
          values={[
            {label: 'Label 1', value: 1},
            {label: 'Label 2', value: 2},
            {label: 'Label 3', value: 3},
          ]}
        />
        <Radios
          label="Column"
          column
          value={1}
          values={[
            {label: 'Label 1', value: 1},
            {label: 'Label 2', value: 2},
            {label: 'Label 3', value: 3},
          ]}
        />
        <Radios
          label="Disabled"
          column
          value={1}
          values={[
            {label: 'Label 1', value: 1},
            {label: 'Label 2', value: 2},
            {label: 'Label 3', value: 3},
          ]}
          disabled
        />
      </Row>
      <Calendar month={new Date().getMonth()} year={new Date().getFullYear()} />
    </Wrapper>
  );
};
ThemePage.displayName = 'ThemePage';

const Wrapper = styled.div`
  flex-grow: 1;
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  overflow-y: auto;
  &:first-child {
    margin-top: auto;
  }
  &:last-child {
    margin-bottom: auto;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
`;
