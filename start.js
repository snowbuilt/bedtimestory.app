import dotenv from 'dotenv'
import spliffy, { log } from '@srfnstack/spliffy'
// import helmet, { contentSecurityPolicy } from 'helmet'
import csurf from 'csurf'
import { fileURLToPath } from 'url'

dotenv.config()

const currentDir = fileURLToPath(new URL('.', import.meta.url))

spliffy(
  {
    routeDir: currentDir + '/src/public',
    cacheStatic: true,
    parseCookie: true,
    middleware: [
      // helmet(
      // todo: fix this
      // {contentSecurityPolicy: false}
      // ),
      csurf({ cookie: { httpOnly: true } }), (req, res, next) => {
        res.setCookie('csrf-token', req.csrfToken(), { path: '/' })
        next()
      }],
    decodeQueryParameters: true,
    resolveWithoutExtension: '.js',
    notFoundRoute: '/index.html',
    nodeModuleRoutes: {
      nodeModulesPath: "node_modules",
      method: 'copy',
      files: [
        {
          modulePath: '@srfnstack/fntags/src/fntags.mjs',
          urlPath: 'fntags.mjs'
        },
        {
          modulePath: '@srfnstack/fntags/src/fnroute.mjs',
          urlPath: 'fnroute.mjs'
        },
        {
          modulePath: '@srfnstack/fntags/src/fnelements.mjs',
          urlPath: 'fnelements.mjs'
        },
        {
          modulePath: '@srfnstack/fntags/src/svgelements.mjs',
          urlPath: 'svgelements.mjs'
        }
      ]
    },
    errorTransformer: (err, refId) => {
      if (err.validationErrors) {
        err.statusCode = 400
        err.body = {validationErrors: err.validationErrors}
        return err
      } else if (!err.statusCode || err.statusCode === 500) {
        log.error(`Obfuscated 500 error. refId: ${refId}`, err)
        err.statusMessage = `Something Went Wrong... ${refId}`
      }
      return err
    }
  }
)
