import { CoreProviders, TreeNode } from '@jotx/coreui'
import { Layout } from './ui/layout'

const tree: TreeNode = {
  id: 'app',
  name: 'Split',
  props: {
    style: { height: '100%' },
  },
}

function App() {
  return (
    <CoreProviders initialSettings={[]} initialTree={tree}>
      <Layout componentRegistry={{}} />
    </CoreProviders>
  )
}

export default App
