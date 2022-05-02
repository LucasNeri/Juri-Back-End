const { Schema, model } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const uuid = require('uuid')

const postSchema = new Schema({
  _id: { type: String, default: () => uuid.v4() },
  name: {
    type: String,
    minLength: [2, 'Nome deve conter no mínimo 2 caracteres'],
    maxLength: [60, 'Nome deve conter no máximo 60 caracteres'],
    required: [true, 'Nome é obrigatório']
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
  },
  date: { 
    type: Date,
    required: [false] 
  },
})

module.exports = model('Post', postSchema.plugin(mongoosePaginate))
