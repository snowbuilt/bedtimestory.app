export default {
  GET: async ({req, res}) => prompt(req.query.prompt)
}