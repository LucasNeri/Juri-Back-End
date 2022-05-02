const validate = require('uuid-validate')

const PostDB = require('../../models/post/index')
const HttpResponse = require('../../helpers/http-response')

class PostRouter {
  /**
   * @name Post.removeLawer
   * @api {delete} /api/deleteLawer/:id
   * @description Remove a Lawer by ID
   * @param {string} id a valid UUID verion 4
   * @returns no content after remove a Lawer
   */
   async removeLawer (id) {
    try {
      if (!id || !validate(id, 4)) {
        return HttpResponse.badRequest('id')
      }
      const model = new PostDB()
      const result = await model.removeLawer(id)

      if (result.statusCode === 200) {
        return result
      }
      return result
    } catch (error) {
      return HttpResponse.serverError()
    }
  }

  /**
   * @name Post.updateLawer
   * @api {put} /api/updateLawer/:id
   * @description Update a Lawer by id
   * @param {string} id a valid UUID version 4
   * @param {Express<http>} httpRequest request
   * @returns {object} new a registrer {{ id: UUID, name: string, email: string }}
   */
   async updateLawer (id, body) {
    if (!body) {
      return HttpResponse.badRequest(body)
    }
    try {
      if (!id) {
        return HttpResponse.badRequestParam('id')
      }
      
      if (!validate(id, 4)) {
        return HttpResponse.badRequestParam('id')
      }

      const model = new PostDB()
      const result = await model.updateLawer(id, body)
      if (result.statusCode === 200) {
        return result
      } else {
        return result
      }
    } catch (error) {
      return HttpResponse.serverError()
    }
  }

  /**
   * @name Post.getLawerByID
   * @api {get} /api/getLawerById/:id
   * @description Get Lawer by ID
   * @param {string} id UUID version 4
   * @returns {object} {{ id: UUID, name: string, date: date, email: string }}
   */
   async getLawerById (id) {
    try {
      if (!id || !validate(id, 4)) {
        return HttpResponse.badRequest('id')
      }
      const model = new PostDB()
      const result = await model.getLawerById(id)

      if (result.statusCode === 200) {
        return result
      }
      return result
    } catch (error) {
      return HttpResponse.serverError()
    }
  }

  /**
   * @name Post.getLawers
   * @api {get} /api/getLawers?page=1&size=10
   * @description Get all Post with pagination
   * @param {string} page
   * @param {string} size
   * @param {string} sort
   * @returns list of Post [{ id: UUID, name: string, date: date, email: string }]
   */
   async getLawers (page, size, sort) {
    try {
      if (!page && !size) {
        return HttpResponse.serverError()
      }
      if (!page && size) {
        return HttpResponse.badRequest('page')
      }
      if (page && !size) {
        return HttpResponse.badRequest('size')
      }
      if (!parseInt(page) > 0) {
        return HttpResponse.badRequest('page')
      }
      if (!parseInt(size) > 0) {
        return HttpResponse.badRequest('size')
      }
      const model = new PostDB()
      const result = await model.getLawers(parseInt(page), parseInt(size), sort)

      if (result.statusCode === 200) {
        return result
      }
      return result
    } catch (error) {
      return HttpResponse.serverError()
    }
  }

  /**
   * @name Post.createLawer
   * @api {post} /api/createLawer
   * @description Create a new post
   * @param {Express<http>} httpRequest request
   * @returns {object} new a registrer { id: UUID, name: string, date: date, email: string }
   */
   async createLawer (body) {
    try {
      body.date = new Date()
      if (!body) {
        return HttpResponse.badRequest(body)
      }
      if (body) {
        // producion db
        const business = new PostDB()
        const result = await business.createLawer(body)
        if (result.statusCode === 400) {
          return result
        }
        return HttpResponse.created(result)
      }
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
module.exports = PostRouter
