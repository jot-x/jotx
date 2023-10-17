import { CoreUI, TreeNode } from '@jotx/coreui'
import 'virtual:uno.css'
import { Layout } from './ui/layout'

const tree: TreeNode = {
  id: 'app',
  name: 'Split',
  props: {
    style: { height: '100%' },
  },
  children: [
    {
      id: 'activity-bar',
      name: 'Split',
      props: {
        minScreen: 'lg',
        direction: 'column',
        style: {
          'background-color': 'hsl(var(--primary))',
          'padding': '1rem 0 1rem 0;',
          'justify-content': 'space-between',
        },
      },
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
    <CoreUI initialSettings={[]} initialTree={tree}>
      <Layout componentRegistry={{}} />
    </CoreUI>
  )
}

export default App
