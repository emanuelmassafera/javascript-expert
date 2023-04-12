import { createServer } from 'node:http'
import { parse, fileURLToPath } from 'node:url'
import { Worker } from 'node:worker_threads'
import { dirname } from 'node:path'
// https://sharp.pixelplumbing.com/install#worker-threads
import sharp from 'sharp'

const currentFolder = dirname(fileURLToPath(import.meta.url))
const workerFileName = 'worker.js'

async function joinImages(images) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(`${currentFolder}/${workerFileName}`)

    worker.postMessage(images)
    worker.once('message', resolve)
    worker.once('error', reject)
    worker.once('exit', code => {
      if (code !== 0) {
        return reject(new Error(`Thread ${worker.threadId} stopped with exit code ${code}`))
      }
      console.log(`Thread ${worker.threadId} exited`)
    })
  })
}

async function handler(request, response) {
  if (request.url.includes('joinImages')) {
    const { query: { img, background } } = parse(request.url, true)

    const imageBase64 = await joinImages({
      image: img,
      background
    })

    response.writeHead(200, {
      'Content-Type': 'text/html'
    })

    return response.end(`<img style="width:100%;height:100%" src="data:image/jpeg;base64,${imageBase64}" />`)
  }

  return response.end('Ok')
}

createServer(handler)
  .listen(3000, () => console.log('Running at 3000'))

// Images
// https://static.wikia.nocookie.net/mkwikia/images/e/ee/Predator_render.png
// https://static3.tcdn.com.br/img/img_prod/460977/boneco_tracker_predator_predador_predadores_predators_escala_1_6_mms147_hot_toys_cg_43510_1_20190427140400.png

// Backgrounds
// https://wallpaperaccess.com/full/3057585.jpg
// https://awwsomeh.files.wordpress.com/2017/12/yfbqz1vppi601.jpg
