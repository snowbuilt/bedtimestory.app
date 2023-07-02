import { a, div, h4, img } from '../../lib/ext/fnelements.mjs'

const pages = [
  { text: 'Chat', link: '/' },
  { text: 'Scratch', link: '/scratch' }
]

const pageLink = (page) => a({href: page.link}, h4(page.text))

export default function headerBar(){
  return div({class: 'navbar bg-base-100'},
    a({href:'/'}, img({src:'/android-chrome-192x192.png'})),
    pages.map(pageLink)
  )
}