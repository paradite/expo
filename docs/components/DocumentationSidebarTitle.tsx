import { css } from '@emotion/react';
import { theme, typography } from '@expo/styleguide';
import * as React from 'react';

import { paragraph } from '~/components/base/typography';

const STYLES_TITLE = css`
  ${paragraph}
  font-size: 15px;
  display: block;
  position: relative;
  margin-bottom: 12px;
  text-decoration: none;
  font-family: ${typography.fontFaces.medium};
  border-bottom: 1px solid ${theme.border.default};
  padding-bottom: 0.25rem;
`;

type Props = React.PropsWithChildren<object>;

export default function DocumentationSidebarTitle(props: Props) {
  return <div css={STYLES_TITLE}>{props.children}</div>;
}
