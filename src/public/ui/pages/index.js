import { div, flexCenteredRow, input, label, p, script } from '../../lib/ext/fnelements.mjs'
import { fnstate } from '../../lib/ext/fntags.mjs'
import player from '../component/player.js'

document.body.append(
  script({src: '/ui/lib/marked.min.js'})
)

export default function index () {
  const loading = fnstate(false)
  const chatGPTResponse = fnstate([])
  const prompt = fnstate('')
  const getGPTResponse = async () => {
    loading(true)
    try {
      const res = await fetch(`/api/chat/gpt/prompt?prompt=${prompt}`)
      const reply = await res.text()
      chatGPTResponse([{ prompt, reply }, ...chatGPTResponse])
    } catch (ex) {
      console.error(ex)
    }
    loading(false)
  }

  return div({ class: 'w-full max-w-5xl pr-10 pl-10' },
    div({ class: 'text-left' },
      // TODO put in fancy buttons in the input so it's as cool as the OG
      input({
        class: 'input input-bordered w-full max-w-xs',
        onkeydown: async e => {
          if (e.key === 'Enter') {
            await getGPTResponse()
          }
        },
        onchange: e => prompt(e.target.value),
        value: prompt.bindAttr(),
        placeholder: 'What is it you wish?'
      }),
      chatGPTResponse().map(res => {
        const replyContainer = div()
        replyContainer.innerHTML = marked.parse(res.reply)
        return div(
          p({fontSize: '14px', class:'mt-20'}, res.prompt),
          flexCenteredRow(
            player(res.reply),
            replyContainer
          )
        )
      })
    )
  )
}