import { CoreUI, TreeNode } from '@jotx/coreui'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import './theme.css'
import './app.css'
import { registerPlugin } from './plugin/register'
import ActivityButton from './ui/activity-button'
import { Layout } from './ui/layout'

const tree: TreeNode = {
  id: 'app',
  name: 'Split',
  props: {
    style: { height: '100%' },
  },
  children: [
    {
      id: 'activity-bar-section',
      name: 'Split',
      props: {
        minScreen: 'lg',
        direction: 'column',
        class: 'bg-primary justify-between pt-4 pb-4 p-1 w-8',
      },
      children: [
        {
          id: 'activity-bar',
          name: 'Split',
        },
        {
          id: 'activity-bar-bottom',
          name: 'Split',
        },
      ],
    },
    {
      id: 'primary-sidebar',
      name: 'Split',
      props: {
        minScreen: 'lg',
        resizable: true,
        handleLocation: 'end',
        resizeSettingsPath: 'layout.primary_sidebar.size',
      },
      children: [
        {
          id: 'explorer',
          name: 'Tabs',
          props: {
            class: 'w-full',
            direction: 'column',
          },
          children: [],
        },
      ],
    },
    {
      id: 'editor',
      name: 'Tabs',
      props: {
        class: 'flex-1',
        direction: 'column',
        nav: true,
      },
    },
    {
      id: 'secondary-sidebar',
      name: 'Split',
      props: {
        minScreen: 'lg',
        resizable: true,
        handleLocation: 'start',
        resizeSettingsPath: 'layout.secondary_sidebar.size',
      },
    },
    {
      id: 'status-bar-section',
      name: 'Split',
      props: {
        class: 'justify-between fixed right-0 bottom-0 w-[100%] h-5 bg-secondary p-1 text-xs items-center',
      },
      children: [
        {
          id: 'status-bar-left',
          name: 'Split',
        },
        {
          id: 'status-bar',
          name: 'Split',
        },
      ],
    },
    {
      id: 'invisible',
      name: 'Split',
      props: {
        class: 'hidden',
      },
      children: [
        {
          id: 'blank-page"',
          name: 'BlankTabListener',
        },
      ],
    },
  ],
}

function App() {
  return (
    <CoreUI
      initialSettings={[]}
      initialTree={tree}
      initialComponents={{ ActivityButton: ActivityButton }}
      initialRoutes={[
        {
          plugin: '@jotx',
          path: '/:fs',
          component: () => <Layout />,
        },
      ]}
      initialPlugins={['filesystems-setup', 'file-explorer', 'markdown', 'statusbar-stats', 'autosave']}
      registerPlugin={registerPlugin}
    />
  )
}

export default App
