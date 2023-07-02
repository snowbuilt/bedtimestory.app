import {prompt} from '../../../../private/chatgptService.js'
export default {
  GET: async ({req, res}) => prompt(req.query.prompt)
}