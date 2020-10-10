import loadable from '@loadable/component'

const LoadableComponent = loadable(
  () => import(
    /* webpackChunkName: "Arrow" */
    './Arrow'
  )
)

export default LoadableComponent
