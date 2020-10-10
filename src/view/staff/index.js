import loadable from '@loadable/component'

const LoadableComponent = loadable(
  () => import(
    /* webpackChunkName: "Staff" */
    './Staff'
  )
)

export default LoadableComponent
