import loadable from '@loadable/component'

const LoadableComponent = loadable(
  () => import(
    /* webpackChunkName: "Login" */
    './Login'
  )
)

export default LoadableComponent
