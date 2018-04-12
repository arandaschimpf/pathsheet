const route = (path, component) => ({
  path,
  component: () => import('layouts/default'),
  children: [{path: '', component: () => component}]
})

export default [
  route('/', import('pages/Statistics')),
  route('/attacks', import('pages/Attacks')),

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
