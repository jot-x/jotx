import { createContext, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'
import { IRoute } from './types'

export const makeRoutingContext = (initialRoutes: IRoute[]) => {
  const [routes, setRoutes] = createStore(initialRoutes)

  const addRoute = (r: IRoute) => {
    setRoutes([...routes, r])
  }

  const removeRoute = (path: string) => {
    // TODO remove...
  }

  return [routes, { addRoute, removeRoute }] as const
}

export type RoutingContextType = ReturnType<typeof makeRoutingContext>
export const RoutingContext = createContext<RoutingContextType>()
export const useRouting = () => useContext(RoutingContext)!
