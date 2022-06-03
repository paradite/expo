import { css } from '@emotion/react';
import { NextRouter } from 'next/router';
import * as React from 'react';

import DocumentationSidebarCollapsible from '~/components/DocumentationSidebarCollapsible';
import DocumentationSidebarLink from '~/components/DocumentationSidebarLink';
import DocumentationSidebarTitle from '~/components/DocumentationSidebarTitle';
import VersionSelector from '~/components/VersionSelector';
import * as Constants from '~/constants/theme';
import { NavigationType, NavigationRoute } from '~/types/common';

const STYLES_SIDEBAR = css`
  padding: 20px 24px 24px 24px;
  width: 280px;

  @media screen and (max-width: ${Constants.breakpoints.mobile}) {
    width: 100%;
  }
`;

const STYLES_SECTION_CATEGORY = css`
  margin-bottom: 24px;
`;

type SidebarProps = {
  router: NextRouter;
  routes?: NavigationRoute[];
};

type SidebarNodeProps = Pick<SidebarProps, 'router'> & {
  route: NavigationRoute;
  parentRoute?: NavigationRoute;
};

const renderTypes: Record<NavigationType, React.ComponentType<SidebarNodeProps> | null> = {
  section: DocumentationSidebarSection,
  group: DocumentationSidebarGroup,
  page: null, // Pages are rendered inside groups and should not be rendered directly
};

export default function DocumentationSidebar({ router, routes = [] }: SidebarProps) {
  return (
    <nav css={STYLES_SIDEBAR} data-sidebar>
      <VersionSelector />
      {routes.map(route => {
        const Component = renderTypes[route.type];
        return (
          !!Component && (
            <Component key={`${route.type}-${route.name}`} router={router} route={route} />
          )
        );
      })}
    </nav>
  );
}

function DocumentationSidebarSection(props: SidebarNodeProps) {
  // If the section or group is hidden, or has no content, we should not render it
  if (props.route.hidden || !props.route.children?.length) {
    return null;
  }

  return (
    <DocumentationSidebarCollapsible
      key={`section-${props.route.name}`}
      router={props.router}
      info={props.route}>
      {props.route.children.map(group => (
        <DocumentationSidebarGroup
          {...props}
          key={`group-${props.route.name}`}
          route={group}
          parentRoute={props.route}
        />
      ))}
    </DocumentationSidebarCollapsible>
  );
}

function DocumentationSidebarGroup(props: SidebarNodeProps) {
  return (
    <div css={STYLES_SECTION_CATEGORY}>
      {!shouldSkipTitle(props.route, props.parentRoute) && (
        <DocumentationSidebarTitle key={props.route.sidebarTitle || props.route.name}>
          {props.route.sidebarTitle || props.route.name}
        </DocumentationSidebarTitle>
      )}
      {(props.route.children || []).map(page => (
        <DocumentationSidebarLink
          key={`${props.route.name}-${page.name}`}
          router={props.router}
          info={page}>
          {page.sidebarTitle || page.name}
        </DocumentationSidebarLink>
      ))}
    </div>
  );
}

function shouldSkipTitle(info: NavigationRoute, parentGroup?: NavigationRoute) {
  if (info.name === parentGroup?.name) {
    // If the title of the group is Expo SDK and the section within it has the same name
    // then we shouldn't show the title twice. You might want to organize your group like
    // so it is collapsable
    return true;
  } else if (
    info.children &&
    ((info.children[0] || {}).sidebarTitle || (info.children[0] || {}).name) === info.name
  ) {
    // If the first child post in the group has the same name as the group, then hide the
    // group title, lest we be very repetitive
    return true;
  }

  return false;
}
