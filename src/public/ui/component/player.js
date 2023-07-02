import { fnstate } from '../../lib/ext/fntags.mjs'
import { div } from '../../lib/ext/fnelements.mjs'
import { speakerWave, stopCircle } from '../lib/icons.js'

export default function player (text) {
  const playing = fnstate(false)
  const toggle = () => playing(!playing)

  const utterance = new window.SpeechSynthesisUtterance(text)
  // utterance.voice = voice
  utterance.volume = 20
  utterance.onEnd = () => playing(false)

  return div(
    playing.bindAs(() => {
      playing() ? stopCircle(toggle) : speakerWave(toggle)
    })
  )
}