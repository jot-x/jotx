import { useParams } from '../routing/params-hook'

export const useCurrentFileSystemName = () => {
  const { fs } = useParams()
  return { fs: fs! }
}
