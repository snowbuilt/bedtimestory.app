import { div, iframe } from '../../lib/ext/fnelements.mjs'

function scratch (url) {
  return div(iframe(
    {
      src: url,
      allowTransparency: true,
      width: '485',
      height: '402',
      frameBorder: '0',
      scrolling: 'no',
      allowFullScreen: true
    }
  ))
}

export default function scratchPage(){
  return div(
    scratch('https://scratch.mit.edu/projects/855091577/embed'),
    scratch('https://scratch.mit.edu/projects/775221709/embed')
  )
}