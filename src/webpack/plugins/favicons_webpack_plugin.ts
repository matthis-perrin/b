import {existsSync} from 'node:fs';
import {join} from 'node:path';

import FaviconsWebpackPlugin from 'favicons-webpack-plugin';

import {maybeReadFileSync} from '@src/fs';
import {asMap, asString} from '@src/type_utils';

function getFaviconPath(context: string): string | undefined {
  const validExtensions = ['svg', 'png', 'jpg', 'jpeg'];
  for (const ext of validExtensions) {
    const faviconPath = join(context, `src/favicon.${ext}`);
    if (existsSync(faviconPath)) {
      return faviconPath;
    }
  }
  return undefined;
}

interface FaviconInfo {
  appName: string;
  locale: string;
  background: string;
}

function getFaviconInfo(context: string): FaviconInfo {
  const json = asMap(JSON.parse(maybeReadFileSync(join(context, `src/favicon.json`)) ?? '{}'), {});
  const appName = asString(json['appName'], '');
  const locale = asString(json['locale'], 'en_US');
  const background = asString(json['background'], '#ffffff');
  return {appName, locale, background};
}

export function faviconsWebpackPlugin(
  context: string,
  publicUrl: string
): FaviconsWebpackPlugin | undefined {
  // Extract app info from favicon.json
  const {appName, locale, background} = getFaviconInfo(context);

  // Find the favicon path
  const faviconPath = getFaviconPath(context);
  if (faviconPath === undefined) {
    return undefined;
  }

  const iconInfo = {
    rotate: false,
    offset: 10,
    transparent: false,
    background,
  };
  return new FaviconsWebpackPlugin({
    logo: faviconPath,
    logoMaskable: faviconPath,
    cache: true,
    inject: true,
    mode: 'webapp',
    favicons: {
      appName,
      appleStatusBarStyle: 'default',
      start_url: '/',
      lang: locale.replace('_', '-'),
      path: `${publicUrl}/assets`,
      background,
      theme_color: background,
      icons: {
        appleIcon: iconInfo,
        appleStartup: iconInfo,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
    },
  });
}
