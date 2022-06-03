import { css } from '@emotion/react';
import { theme, typography, iconSize, ChevronDownIcon } from '@expo/styleguide';
import * as React from 'react';

import * as Utilities from '~/common/utilities';
import { paragraph } from '~/components/base/typography';
import { VERSIONS, LATEST_VERSION, BETA_VERSION } from '~/constants/versions';
import { usePageApiVersion } from '~/providers/page-api-version';

const STYLES_SELECT = css`
  position: relative;
  margin: 0;
  padding: 8px 16px;
  border-radius: 5px;
  margin-bottom: 15px;
  width: 100%;
  background-color: ${theme.background.default};
  border: 1px solid ${theme.border.default};
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.015), 0 0 0 1px rgba(0, 0, 0, 0.0075);

  :hover {
    background-color: ${theme.background.secondary};
  }
`;

const STYLES_SELECT_TEXT = css`
  ${paragraph}
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: space-between;
  font-family: ${typography.fontFaces.medium};
  color: ${theme.text.default};
  font-size: 14px;
`;

const STYLES_SELECT_ELEMENT = css`
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  width: 100%;
  border-radius: 0px;
  cursor: pointer;
`;

type Props = {
  style?: React.CSSProperties;
};

const VersionSelector: React.FC<Props> = ({ style }) => {
  const { version, hasVersion, setVersion } = usePageApiVersion();

  if (!hasVersion) {
    return null;
  }

  return (
    <div css={STYLES_SELECT} style={style}>
      <label css={STYLES_SELECT_TEXT} htmlFor="version-menu">
        <div>{Utilities.getUserFacingVersionString(version, LATEST_VERSION, BETA_VERSION)}</div>
        <ChevronDownIcon size={iconSize.small} />
      </label>
      {
        // Add hidden links to create crawlable references to other SDK versions
        // We can use JS to switch between them, while helping search bots find other SDK versions
        VERSIONS.map(version => (
          <a key={version} style={{ display: 'none' }} href={`/versions/${version}/`} />
        ))
      }
      <select
        id="version-menu"
        css={STYLES_SELECT_ELEMENT}
        value={version}
        onChange={e => setVersion(e.target.value)}>
        {VERSIONS.map(version => (
          <option key={version} value={version}>
            {Utilities.getUserFacingVersionString(version, LATEST_VERSION, BETA_VERSION)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default VersionSelector;
