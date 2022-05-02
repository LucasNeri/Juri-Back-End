const Post = require('../controllers/post')

// Post Routes
const PostController = new Post()
class Handler {
  async HandlerDeleteLawer (req, res) {
    const httpResponse = await PostController.removeLawer(req.params.id)
    res.status(httpResponse.statusCode).json(httpResponse)
  }

  async HandlerUpdateLawer (req, res) {
    const httpResponse = await PostController.updateLawer(req.params.id, req.body)
    res.status(httpResponse.statusCode).json(httpResponse)
  }

  async HandlerGetLawerById (req, res) {
    const httpResponse = await PostController.getLawerById(req.params.id)
    res.status(httpResponse.statusCode).json(httpResponse)
  }

  async HandlerGetLawers (req, res) {
    const httpResponse = await PostController.getLawers(
      req.query.page,
      req.query.size,
      req.query.sort,
    )
    res.status(httpResponse.statusCode).json(httpResponse)
  }

  async HandlerCreateLawer (req, res) {
    const httpResponse = await PostController.createLawer(req.body)
    res.status(httpResponse.statusCode).json(httpResponse)
  }
}

module.exports = Handler
