import express from 'express'
import cors from 'cors'
import axios from 'axios'
import dotenv from 'dotenv';

dotenv.config()

const PORT = process.env.PORT || 8000

const app = express()

app.use(cors())
app.use(express.json());

app.get('/api/movies', (req,res) => {

    const randomPage = Math.floor((Math.random() * 10) + 1)

    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${randomPage}&sort_by=popularity.desc&with_original_language=en`,
        headers: {
          accept: 'application/json',
          Authorization: process.env.VITE_API_KEY
        }
      }

      axios.request(options).then((response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(response.data));
      }).catch((err) => {res.json(err)})
})

app.use(express.static('dist'));

app.listen(8000, () => console.log(`Server is running on ${PORT}`))