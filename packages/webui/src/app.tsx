import { CoreUI, TreeNode } from '@jotx/coreui'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import './theme.css'
import './app.css'
import './cmd.css'
import { registerPlugin } from './plugin/register'
import ActivityButton from './ui/activity-button'
import { Layout } from './ui/layout'
import { Settings } from '@jotx/coreui/src/settings/types'
import { UndoRedoCommands } from './undo-redo-commands'
import { EditorCloseTabCommand } from './editor-close-tab-command'

const initialSettings: Settings[] = [
  {
    title: 'Daily notes',
    properties: {
      'daily_notes.format': {
        type: 'string',
        default: 'YYYY-MM-DD',
        description: 'Today file name format',
      },
    },
  },
  {
    title: 'Layout',
    properties: {
      'layout.primary_sidebar.size': {
        type: 'number',
        default: 20,
        description: '',
      },
      'layout.secondary_sidebar.size': {
        type: 'number',
        default: 20,
        description: '',
      },
    },
  },
]

const tree: TreeNode = {
  id: 'app',
  name: 'Split',
  props: {
    class: 'flex-col h-full',
  },
  children: [
    {
      id: 'main',
      name: 'Split',
      props: {
        class: 'h-full',
      },
      children: [
        {
          id: 'activity-bar-section',
          name: 'Split',
          props: {
            minScreen: 'lg',
            direction: 'column',
            class: 'bg-primary justify-between pb-4 pt-4 pl-1 pr-1 w-8',
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
      ],
    },
    {
      id: 'status-bar-section',
      name: 'Split',
      props: {
        class: 'justify-between w-[100%] h-5 bg-secondary p-1 text-xs items-center basis-8',
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
      id: 'hidden',
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
      initialSettings={initialSettings}
      initialTree={tree}
      initialComponents={{ ActivityButton: ActivityButton }}
      initialRoutes={[
        {
          plugin: '@jotx',
          path: '/:fs',
          component: () => <Layout />,
        },
      ]}
      initialCommands={[UndoRedoCommands, EditorCloseTabCommand]}
      initialPlugins={['filesystems-setup', 'file-explorer', 'markdown', 'statusbar-stats', 'autosave']}
      registerPlugin={registerPlugin}
    />
  )
}

export default App
