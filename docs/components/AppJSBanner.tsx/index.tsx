import { css } from '@emotion/react';
import { borderRadius, breakpoints, shadows, spacing, theme } from '@expo/styleguide';
import isBefore from 'date-fns/isBefore';
import { useRouter } from 'next/router';
import React from 'react';

import { Background } from './Background';

import { Button } from '~/ui/components/Button';
import { CALLOUT, HEADLINE } from '~/ui/components/Text';

export function AppJSBanner() {
  const router = useRouter();
  const appJSConfEndDate = new Date('2022-06-08');
  const showAppJSConfShoutout = isBefore(new Date(), appJSConfEndDate);
  const isHomePage = router.pathname === '/';

  if (!showAppJSConfShoutout || !isHomePage) {
    return null;
  }

  return (
    <div css={containerStyle}>
      <div css={backgroundStyle}>
        <Background />
      </div>
      <div>
        <HEADLINE css={headlineStyle}>App.js Conf 2022</HEADLINE>
        <CALLOUT css={descriptionStyle}>
          An Expo &amp; React Native conference in Europe is back, June 8 - 10 in Kraków, Poland!
        </CALLOUT>
      </div>
      <Button size="mini" href="https://appjs.co" openInNewTab css={learnMoreButtonStyle}>
        Learn more
      </Button>
    </div>
  );
}

const containerStyle = css({
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#0019C1',
  padding: `${spacing[4]}px ${spacing[6]}px ${spacing[4]}px ${spacing[4]}px`,
  borderRadius: borderRadius.medium,
  overflow: 'hidden',
  gap: spacing[3],
  boxShadow: shadows.micro,
  marginBottom: spacing[10],

  [`@media (max-width: ${breakpoints.medium}px)`]: {
    flexWrap: 'wrap',
  },
});

const backgroundStyle = css({
  position: 'absolute',
  top: -4,
  left: -4,
});

const headlineStyle = css({
  position: 'relative',
  color: theme.palette.white,
  marginBottom: spacing[1],
});

const descriptionStyle = css({
  position: 'relative',
  color: '#CCD3FF',
});

const learnMoreButtonStyle = css({
  backgroundColor: theme.palette.white,
  color: '#0019C1',
});
