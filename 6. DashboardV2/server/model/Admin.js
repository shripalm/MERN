const { Schema, model } = require('mongoose')
const { hash } = require('bcrypt')

const adminSchema = new Schema({
    
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    
}, 

{
    timestamps: true
})

adminSchema.pre('save', async function(next) {
    this.password = await hash(this.password, 10)
    next()
})

module.exports = model('admin', adminSchema)