import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>Edge Design</span>,
  project: {
    link: 'https://github.com/theriseunion/edge-platform',
  },
  docsRepositoryBase: 'https://github.com/theriseunion/edge-platform/tree/master/design',
  footer: {
    text: 'Edge Design System',
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    titleComponent({ title, type }) {
      if (type === 'separator') {
        return <span className="font-semibold">{title}</span>
      }
      return <>{title}</>
    }
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Edge Design',
    }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Edge Platform Design System" />
    </>
  ),
}

export default config
