import { css, CSSObject } from '@emotion/react';
import { typography } from '@expo/styleguide';
import React, { ComponentType, PropsWithChildren } from 'react';

import { Blockquote } from './Blockquote';

import { Cell, HeaderCell, Row, Table, TableHead } from '~/ui/components/Table';
import { A, CODE, P, BOLD, UL, OL, LI, createTextComponent } from '~/ui/components/Text';
import { TextElement } from '~/ui/components/Text/types';
import { withAnchor } from '~/ui/components/Text/withAnchor';

type Config = ConfigStyles & {
  Component: ComponentType<ComponentProps> | string;
};

type ConfigStyles = {
  css?: CSSObject;
  style?: React.CSSProperties;
};

type ComponentProps = PropsWithChildren<{
  className?: string;
  style?: React.CSSProperties;
}>;

const headerMarginBottom = '0.5ch';
const paragraphMarginBottom = '1ch';
const headerPaddingTop = '1.5ch';

export const H1 = withAnchor(
  createTextComponent(TextElement.H1, css(typography.headers.default.h1))
);
export const H2 = withAnchor(
  createTextComponent(TextElement.H2, css(typography.headers.default.h2))
);
export const H3 = withAnchor(
  createTextComponent(TextElement.H4, css(typography.headers.default.h3))
);
export const H4 = withAnchor(
  createTextComponent(TextElement.H4, css(typography.headers.default.h4))
);
export const H5 = withAnchor(
  createTextComponent(TextElement.H5, css(typography.headers.default.h5))
);
export const H6 = withAnchor(
  createTextComponent(TextElement.H6, css(typography.headers.default.h6))
);

const markdownStyles: Record<string, Config | null> = {
  // When using inline markdown, we need to remove the document layout wrapper.
  // Always set this to `null` to overwrite the global MDX provider.
  wrapper: null,
  h1: {
    Component: H1,
    style: { marginBottom: headerMarginBottom },
  },
  h2: {
    Component: H2,
    style: { marginBottom: headerMarginBottom, paddingTop: headerPaddingTop },
  },
  h3: {
    Component: H4,
    style: { marginBottom: headerMarginBottom, paddingTop: headerPaddingTop },
  },
  h4: {
    Component: H4,
    style: { marginBottom: headerMarginBottom, paddingTop: headerPaddingTop },
  },
  h5: {
    Component: H5,
    style: { marginBottom: headerMarginBottom, paddingTop: headerPaddingTop },
  },
  p: {
    Component: P,
    style: { marginBottom: paragraphMarginBottom },
  },
  strong: {
    Component: BOLD,
  },
  ul: {
    Component: UL,
    style: { paddingBottom: paragraphMarginBottom, marginLeft: '2ch' },
  },
  ol: {
    Component: OL,
    style: { paddingBottom: paragraphMarginBottom, marginLeft: '2ch' },
  },
  li: {
    Component: LI,
    css: typography.body.li,
  },
  hr: {
    Component: 'hr',
    css: typography.utility.hr,
    style: { margin: `2ch 0` },
  },
  blockquote: {
    Component: Blockquote,
    style: {
      marginBottom: paragraphMarginBottom,
    },
  },
  img: {
    Component: 'img',
    style: { width: '100%' },
  },
  code: {
    Component: 'pre',
    css: typography.utility.pre,
  },
  inlineCode: {
    Component: CODE,
  },
  a: {
    Component: A,
    css: typography.utility.anchor,
  },
  table: {
    Component: Table,
    style: {
      margin: '16px 0px 32px 0px',
      borderCollapse: 'collapse',
    },
  },
  thead: {
    Component: TableHead,
  },
  tr: {
    Component: Row,
  },
  th: {
    Component: HeaderCell,
  },
  td: {
    Component: Cell,
  },
};

export const markdownComponents = Object.keys(markdownStyles).reduce(
  (all, key) => ({
    ...all,
    [key]: markdownStyles[key] ? createMarkdownComponent(markdownStyles[key]!) : null,
  }),
  {}
);

function componentName({ Component }: Config) {
  if (typeof Component === 'string') return Component;
  return Component.displayName || Component.name || 'Anonymous';
}

function createMarkdownComponent(config: Config) {
  const { Component, css: cssClassname, style } = config;
  const MDXComponent = (props: ComponentProps) => (
    <Component {...props} css={css(cssClassname)} style={style}>
      {props.children}
    </Component>
  );
  MDXComponent.displayName = `Markdown(${componentName(config)})`;
  return MDXComponent;
}
