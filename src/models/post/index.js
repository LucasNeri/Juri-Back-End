const validateBody = require('../post/validation')
const PostModel = require('./model')
const HttpResponse = require('../../helpers/http-response')

class PostDB {
  constructor (httpResquest) {
    this.httpResquest = httpResquest
  }

  async removeLawer (id) {
    try {
      const find = await PostModel.findOne({ _id: id })
      if (find) {
        const remove = await PostModel.deleteOne({ _id: id })

        if (remove) {
          return HttpResponse.ok(remove)
        }
      }
      return HttpResponse.notFound('id')
    } catch (e) {
      console.error(e)
    }
  }

  async updateLawer (id, body) {
    try {
      const { error, isValid } = await validateBody(body)
      if (error) {
        return error
      }
      const find = await PostModel.findOne({ _id: id })
      if (isValid) {
        if (find) {
          const result = await PostModel.updateOne({ _id: id }, body)
          if (result.acknowledged) {
            const current = await PostModel.find({ _id: id }, body)
            return HttpResponse.ok(current)
          }
        }
        return HttpResponse.notFound('id')
      }
    } catch (e) {
      console.error(e)
    }
  }

  async getLawerById (id) {
    try {
      const find = await PostModel.findOne({ _id: id })
      if (find) {
        return HttpResponse.ok(find)
      }
      return HttpResponse.notFound('id')
    } catch (e) {
      console.error(e)
    }
  }

  async getLawers (page, size, sort) {
    try {
      const offset = size * (page - 1)

      const options = {
        sort: { date: -1 },
        select: 'name email date',
        lean: false,
        offset,
        limit: size
      }

      if (sort) {
        if (sort === 'date') {
          options.sort = { date: 1 }
        } else if (sort === 'name') {
          options.sort = { name: 1 }
        }
      }

      const result = await PostModel.paginate(
        {},
        options,
        async (_err, res) => {
          return await res
        }
      )

      result.pages = Math.ceil(result.total / size)
      
      if (result.docs.length > 0) {
        return HttpResponse.ok(result)
      }

      return HttpResponse.notFound('page or size')
    } catch (e) {
      console.error(e)
    }
  }

  async createLawer (body) {
    try {
      const { error, isValid } = await validateBody(body)
      if (error) {
        return error
      }
      const result = await PostModel.create(body)
      if (isValid) {
        return {
          _id: result._id,
          title: result.title,
          body: result.body,
          tags: result.tags
        }
      }
    } catch (e) {
      console.error(e)
    }
  }
}

module.exports = PostDB
