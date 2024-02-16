import {styled} from 'styled-components';

import {AddPrefix, addPrefix} from '@shared/lib/type_utils';

import {Label, LabelProps} from '@shared-web/components/core/label';
import {CustomWithout} from '@shared-web/lib/react';
import {optional, optionalPx} from '@shared-web/lib/styled_utils';
import {useTheme} from '@shared-web/theme/theme_context';
import {FrontendTheme} from '@shared-web/theme/theme_model';

export interface RadioProps {
  name: string;
  value: string;
  children: LabelProps['value'];
  overrides?: Partial<FrontendTheme['radio']>;
}

export const Radio: CustomWithout<RadioProps, 'input', 'children'> = ({
  name,
  value,
  children,
  overrides,
  ...inputProps
}) => {
  const {disabled} = inputProps;
  const {radio} = useTheme();
  const radioTheme = addPrefix({...radio, ...overrides}, '$');

  const LabelClass = disabled ? DisabledLabel : EnabledLabel;

  return (
    <LabelClass labelAfter labelWrap value={children} {...radioTheme}>
      <Input
        type="radio"
        name={name}
        value={value}
        $color={radioTheme.$color}
        $height={radioTheme.$inputHeight}
        {...inputProps}
      />
    </LabelClass>
  );
};
Radio.displayName = 'Radio';

const BaseLabel = styled(Label)<AddPrefix<FrontendTheme['radio'], '$'>>`
  display: flex;
  align-items: center;
  user-select: none;
  ${p => optionalPx('padding-top', p.$labelPaddingTop)};
  ${p => optionalPx('padding-right', p.$labelPaddingRight)};
  ${p => optionalPx('padding-bottom', p.$labelPaddingBottom)};
  ${p => optionalPx('padding-left', p.$labelPaddingLeft)};
  ${p => optionalPx('font-size', p.$fontSize)};
  border-radius: ${p => p.$labelBorderRadius}px;
`;
const EnabledLabel = styled(BaseLabel)<AddPrefix<FrontendTheme['checkbox'], '$'>>`
  cursor: pointer;
  &:hover {
    background-color: ${p => p.$labelHoverColor};
  }
`;
const DisabledLabel = styled(BaseLabel)`
  opacity: 0.4;
`;
const Input = styled.input<{$color: string | undefined; $height: string | number | undefined}>`
  margin-right: 8px;
  ${p => optional('accent-color', p.$color)}
  ${p => optionalPx('height', p.$height)}
`;
