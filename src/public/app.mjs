import { modRouter, setRootPath } from './lib/ext/fnroute.mjs'
import { script, style } from './lib/ext/fnelements.mjs'
import noPage from './ui/component/noPage.js'
import frame from './ui/component/frame.js'

const css = `
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
`

setRootPath('/')
  document.body.append(
    style(css),
    modRouter(
      {
        routePath: '/ui/pages',
        frame,
        onerror: e => {
          console.error(e)
          return frame(noPage())
        }
      }),
    script({ src: 'http://localhost:13420/livereload.js?snipver=1' })
  )