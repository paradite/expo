import { css } from '@emotion/react';
import {
  spacing,
  theme,
  typography,
  useTheme,
  DiscordIcon,
  DiscourseIcon,
  GithubIcon,
  RedditIcon,
  TwitterIcon,
} from '@expo/styleguide';
import { useRouter } from 'next/router';
import React, { PropsWithChildren } from 'react';
import { Container, Row } from 'react-grid-system';

import DocumentationPage from '~/components/DocumentationPage';
import { APIGridCell, CommunityGridCell, GridCell, HomeButton } from '~/ui/components/Home';
import {
  APICameraIcon,
  APIListIcon,
  APIMapsIcon,
  APINotificationsIcon,
  CodecademyImage,
  DevicesImage,
  QuickStartIcon,
  SnackImage,
  WhyImage,
} from '~/ui/components/Home/resources';
import { Spacer } from '~/ui/components/Separator';
import { Terminal } from '~/ui/components/Snippet';
import { H1, H2, H3, P } from '~/ui/components/Text';

export const CellContainer = ({ children, style }: PropsWithChildren<{ style?: object }>) => (
  // https://github.com/sealninja/react-grid-system/issues/175
  <Container
    fluid
    style={{ paddingLeft: -15, paddingRight: -15, marginBottom: spacing[8], ...style }}>
    {children}
  </Container>
);

const Description = ({ children }: PropsWithChildren<object>) => (
  <P style={{ marginTop: spacing[1], marginBottom: spacing[2], color: theme.text.secondary }}>
    {children}
  </P>
);

const Home = () => {
  const router = useRouter();
  const { themeName } = useTheme();
  const { palette, button, background } = theme;
  return (
    <DocumentationPage router={router} tocVisible={false} hideFromSearch>
      <H1 style={{ marginBottom: 8, fontFamily: typography.fontStacks.black, fontWeight: '900' }}>
        Create amazing apps that run everywhere
      </H1>
      <Description>
        Build one JavaScript/TypeScript project that runs natively on all your users' devices.
      </Description>
      <Spacer />
      <CellContainer>
        <Row>
          <GridCell
            xl={4}
            lg={12}
            style={{
              backgroundColor: background.secondary,
              backgroundImage: 'url("/static/images/home/QuickStartPattern.svg")',
              backgroundBlendMode: 'multiply',
              minHeight: 250,
            }}>
            <div
              css={baseGradientStyle}
              style={{
                background: `linear-gradient(${background.secondary} 15%, #21262d00 100%)`,
              }}
            />
            <div
              css={{
                position: 'relative',
                zIndex: 1,
              }}>
              <H2>
                <QuickStartIcon /> Quick Start
              </H2>
              <br />
              <Terminal
                hideOverflow
                cmd={['$ npm i -g expo-cli', '$ expo init my-project']}
                cmdCopy="npm install --global expo-cli && expo init my-project"
              />
            </div>
          </GridCell>
          <GridCell
            xl={8}
            lg={12}
            style={{
              backgroundColor: palette.primary['100'],
              borderColor: palette.primary[themeName === 'dark' ? '300' : '200'],
              backgroundImage: 'url("/static/images/home/TutorialPattern.svg")',
              backgroundBlendMode: 'multiply',
              minHeight: 250,
            }}>
            <div
              css={baseGradientStyle}
              style={{
                background: `linear-gradient(${palette.primary['100']} 15%, #201d5200 100%)`,
              }}
            />
            <DevicesImage />
            <H2 style={{ color: palette.primary['900'], zIndex: 1, position: 'relative' }}>
              Create a universal Android, iOS,
              <br />
              and web photo sharing app
            </H2>
            <HomeButton
              style={{
                background: button.primary.background,
                color: button.primary.foreground,
                height: 40,
              }}
              href="/tutorial/planning/">
              Start Tutorial
            </HomeButton>
          </GridCell>
        </Row>
      </CellContainer>
      <H3>Learn more</H3>
      <Description>Try out Expo in minutes and learn how to get the most out of Expo.</Description>
      <CellContainer>
        <Row>
          <GridCell
            xxl={4}
            xl={6}
            lg={6}
            style={{ backgroundColor: palette.blue['000'], borderColor: palette.blue['200'] }}>
            <SnackImage />
            <H3 style={{ color: palette.blue['900'], marginBottom: spacing[1.5] }}>
              Try Expo in your browser
            </H3>
            <P style={{ color: palette.blue['800'], ...typography.fontSizes[14] }}>
              Expo’s Snack lets you try Expo
              <br />
              with zero local setup.
            </P>
            <HomeButton
              style={{ backgroundColor: palette.blue['500'], color: palette.blue['100'] }}
              href="https://snack.expo.dev/"
              target="_new">
              Create a Snack
            </HomeButton>
          </GridCell>
          <GridCell
            xxl={4}
            xl={6}
            lg={6}
            style={{
              backgroundColor: palette.orange['100'],
              borderColor: palette.orange[themeName === 'dark' ? '300' : '200'],
            }}>
            <CodecademyImage />
            <H3 style={{ color: palette.orange['900'] }}>
              Learn Expo on
              <br />
              Codecademy
            </H3>
            <HomeButton
              style={{ backgroundColor: palette.orange['800'], color: palette.orange['100'] }}
              href="https://www.codecademy.com/learn/learn-react-native"
              target="_new">
              Start Course
            </HomeButton>
          </GridCell>
          <GridCell
            xxl={4}
            xl={6}
            lg={6}
            style={{ backgroundColor: palette.green['000'], borderColor: palette.green['200'] }}>
            <WhyImage />
            <H3 style={{ color: palette.green['900'], marginBottom: spacing[1.5] }}>
              Why choose Expo?
            </H3>
            <P style={{ color: palette.green['800'], ...typography.fontSizes[14] }}>
              Learn the tradeoffs of
              <br />
              using Expo.
            </P>
            <HomeButton
              style={{ backgroundColor: palette.green['700'], color: palette.green['000'] }}
              href="/introduction/faq">
              Read
            </HomeButton>
          </GridCell>
        </Row>
      </CellContainer>
      <H3>Explore APIs</H3>
      <Description>
        Expo supplies a vast array of SDK modules. You can also create your own.
      </Description>
      <CellContainer>
        <Row>
          <APIGridCell
            title="Maps"
            link="/versions/latest/sdk/map-view"
            icon={<APIMapsIcon size={70} />}
          />
          <APIGridCell
            title="Camera"
            link="/versions/latest/sdk/camera"
            icon={<APICameraIcon size={70} />}
          />
          <APIGridCell
            title="Notifications"
            link="/versions/latest/sdk/notifications"
            icon={<APINotificationsIcon size={70} />}
          />
          <APIGridCell
            title="View all APIs"
            link="/versions/latest/"
            icon={<APIListIcon size={70} />}
          />
        </Row>
      </CellContainer>
      <H3>Join the community</H3>
      <Description>See the source code, connect with others, and get connected.</Description>
      <CellContainer>
        <Row>
          <CommunityGridCell
            title="GitHub"
            description="View our SDK, submit a PR, or report an issue."
            link="https://github.com/expo/expo"
            icon={<GithubIcon color={palette.white} />}
          />
          <CommunityGridCell
            title="Discord"
            description="Join our Discord and chat with other Expo users."
            link="https://chat.expo.dev"
            icon={<DiscordIcon color={palette.white} />}
            iconBackground="#3131E8"
          />
        </Row>
        <Row>
          <CommunityGridCell
            title="Twitter"
            description="Follow Expo on Twitter for news and updates."
            link="https://twitter.com/expo"
            icon={<TwitterIcon color={palette.white} />}
            iconBackground="#1E8EF0"
          />
          <CommunityGridCell
            title="Forums"
            description="Ask or answer a question on the forums."
            link="https://forums.expo.dev/"
            icon={<DiscourseIcon color={palette.white} />}
          />
        </Row>
        <Row>
          <CommunityGridCell
            title="Reddit"
            description="Get the latest on /r/expo."
            link="https://www.reddit.com/r/expo"
            icon={<RedditIcon color={palette.white} />}
            iconBackground="#FC471E"
          />
        </Row>
      </CellContainer>
    </DocumentationPage>
  );
};

const baseGradientStyle = css({
  top: 0,
  left: 0,
  zIndex: 1,
  width: '100%',
  height: '100%',
  position: 'absolute',
});

export default Home;
