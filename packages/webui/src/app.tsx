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
        class: 'bg-jotx-primary justify-between p-2',
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
      name: 'Tabs',
      props: {
        minScreen: 'lg',
        resizable: true,
        handleLocation: 'end',
        resizeSettingsPath: 'layout.primary_sidebar.size',
      },
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
      id: 'status-bar',
      name: 'Split',
      props: {},
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
      initialPlugins={['filesystems-setup']}
      registerPlugin={registerPlugin}
    />
  )
}

export default App
