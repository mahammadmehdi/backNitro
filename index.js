import express from 'express';
import mongoose, { Schema } from 'mongoose';
import cors from "cors"

const app = express()
const port = 3000
app.use(express.json())
app.use(cors())

const nitroSchema = new Schema({
    icon: String, 
    name: String,
    description: String,

});

const nitroModel = mongoose.model('Nitro', nitroSchema);

app.get('/', async (req, res) => {
    const nitro = await nitroModel.find({})
    res.send(nitro)
})

app.get('/:id', async (req, res) => {
    const { id } = req.params
    const nitro = await nitroModel.findById(id)
    res.send(nitro)
})

app.post('/', async (req, res) => {
    const { icon, name, description } = req.body
    const newNitro = new nitroModel({ icon, name, description })
    await newNitro.save()
    res.send('Got a POST request')
})

app.put('/:id', async (req, res) => {
    const { id } = req.params
    const { icon, name, description } = req.body
    const nitro = await nitroModel.findByIdAndUpdate(id, { icon, name, description })
    res.send(nitro)
})

app.delete('/:id', async (req, res) => {
    const { id } = req.params
    const nitro = await nitroModel.findByIdAndDelete(id)
    res.send(nitro)
})

mongoose.connect('mongodb+srv://mahammad:mahammad@cluster0.errjuf4.mongodb.net/');


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})