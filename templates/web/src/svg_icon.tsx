import {styled} from 'styled-components';

import {Custom} from '@src/lib/react';
import {cssPx, optional, optionalRaw} from '@src/lib/styled_utils';

const DEFAULT_ICON_SIZE = 24;

const ICONS = {
  ChevronLeft: {
    viewBox: '0 0 24 24',
    element: <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />,
  },
  ChevronRight: {
    viewBox: '0 0 24 24',
    element: <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />,
  },
  ChevronUp: {
    viewBox: '0 0 24 24',
    element: <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />,
  },
  ChevronDown: {
    viewBox: '0 0 24 24',
    element: <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />,
  },
};

export type SvgIconName = keyof typeof ICONS;

interface SvgIconProps {
  name: SvgIconName;
  width?: number;
  height?: number;
  size?: number;
  color?: string;
  colorHover?: string;
  noColor?: boolean;
  noSize?: boolean;
  sizeImportant?: boolean;
}

export const SvgIcon: Custom<SvgIconProps, 'svg'> = ({
  name,
  size,
  width,
  height,
  color = 'black',
  colorHover,
  noColor,
  noSize,
  sizeImportant,
  onClick,
  ...rest
}) => {
  const {viewBox, element} = ICONS[name];
  const w = width ?? size;
  const h = height ?? size;
  const sizeOverride =
    w === undefined && h === undefined && !noSize ? DEFAULT_ICON_SIZE : undefined;
  const handleClick = onClick;
  return (
    <ColoredSvg
      viewBox={viewBox}
      $width={sizeOverride ?? w}
      $height={sizeOverride ?? h}
      $fill={noColor ? undefined : color}
      $fillHover={noColor ? undefined : colorHover ?? color}
      $clickable={onClick !== undefined}
      $sizeImportant={sizeImportant}
      onClick={handleClick}
      {...rest}
    >
      {element}
    </ColoredSvg>
  );
};
SvgIcon.displayName = 'SvgIcon';

const ColoredSvg = styled.svg<{
  $fill?: string;
  $fillHover?: string;
  $clickable?: boolean;
  $sizeImportant?: boolean;
  $width: number | undefined;
  $height: number | undefined;
}>`
  ${p => optional('fill', p.$fill)}
  ${p => optionalRaw(p.$fillHover, v => `&:hover { fill: ${v}; }`)}
  ${p => optionalRaw(p.$width, v => `width: ${cssPx(v)}${p.$sizeImportant ? '!important;' : ''};`)}
  ${p =>
    optionalRaw(p.$height, v => `height: ${cssPx(v)}${p.$sizeImportant ? '!important;' : ''};`)}
  ${p => (p.$clickable ? 'cursor: pointer;' : undefined)}
`;
