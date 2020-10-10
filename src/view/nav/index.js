import loadable from '@loadable/component'

const LoadableComponent = loadable(
  () => import(
    /* webpackChunkName: "Nav" */
    './Nav'
  )
)

export default LoadableComponent
