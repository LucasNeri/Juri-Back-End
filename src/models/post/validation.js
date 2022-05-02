const PostModel = require('./model')
const HttpResponse = require('../../helpers/http-response')
const EmailValidator = require('../../helpers/email-validator')

const validateBody = async (body) => {
  const clientPost = new PostModel(body)

  const error = clientPost.validateSync()

  const result = {
    isValid: true,
    error: null
  }

  if (error) {
    const { message } = error
    result.isValid = false
    result.error = HttpResponse.badRequestParam(message)
    
    result.error.frontendMessage = []
    if (error.errors.email) {
      result.error.frontendMessage.push(error.errors.email.properties.message)
    } else {
      const emailValidator = new EmailValidator()
      const validEmail = emailValidator.isValid(body.email)
      if (!validEmail) {
        result.error.frontendMessage.push('Email inválido')
      }
    }
    if (error.errors.name) {
      result.error.frontendMessage.push(error.errors.name.properties.message)
    }
  } else {
    const emailValidator = new EmailValidator()
    const validEmail = emailValidator.isValid(body.email)
    if (!validEmail) {
      result.isValid = false
      result.error = HttpResponse.badRequestParam('Email inválido')
      result.error.frontendMessage.push('Email inválido')
    }
  }

  return result
}

module.exports = validateBody
