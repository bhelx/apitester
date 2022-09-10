const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const { exec } = require('child_process')
const app = express()
const port = 4000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/compile', (req, res) => {
  console.log(req.body)
  const headerCode = fs.readFileSync("./header.ts")
  const source = headerCode + "\n\n" + req.body.source
  const id = req.body.id
  console.log(source)
  fs.writeFileSync("./on-request-pdk/assembly/index.ts", source)

  // warning: nothing about this is safe! not secure or concurrent capable
  exec(`cd ./on-request-pdk/ && npm run asbuild:debug && cp build/debug.wasm /wasm/${id}.wasm`, (error, stdout, stderr) => {
    if (error) throw new Error(error)
    console.log(stdout)
    console.log(stderr)

    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify({"ok": true}))
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})