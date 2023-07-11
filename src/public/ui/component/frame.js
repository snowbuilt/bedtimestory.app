import { div, flexCenteredCol } from '../../lib/ext/fnelements.mjs'
import headerBar from './headerBar.js'

export default function frame(rootComponent, module){
  return div({class: 'align-top bg-gray-700 min-h-screen'},
    headerBar(),
    flexCenteredCol({class: 'text-white'},
      rootComponent
    )
  )
}