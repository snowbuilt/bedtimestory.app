import { div, flexCenteredRow, input, label, p } from '../../lib/ext/fnelements.mjs'
import { fnstate } from '../../lib/ext/fntags.mjs'
import player from '../component/player.js'
import { marked } from '../lib/marked.min.js'

function swooshInput (text, inputAttrs) {
  return div({ class: 'w-72' },
    div({ class: 'relative h-10 w-full min-w-[200px]' },
      input({
          ...inputAttrs,
          class: 'peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50',
          placeholder: ' '
        },
        label({
            class: 'before:content[\' \'] after:content[\' \'] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500'
          },
          text
        ),
      ),
    )
  )
}

export default function chatGPT () {
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
      swooshInput('What is it you wish?', {
        onKeyDown: async e => {
          if (e.key === 'Enter') {
            await getGPTResponse()
          }
        },
        onChange: e => prompt(e.target.value),
        value: prompt.bindAttr()
      }),
      chatGPTResponse.map(res => {
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