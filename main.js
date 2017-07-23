const {app, Tray, net, Menu, BrowserWindow} = require('electron')
const path = require('path')
const fetch = require('electron-fetch')

const assetsDirectory = path.join(__dirname, 'assets')

let tray = undefined
let window = undefined

// Don't show the app in the doc
app.dock.hide()

app.on('ready', () => {
  createTray()
  startTick()
  fetchPrice()
  createWindow()
})

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600})
  // mainWindow.loadURL('file://' + __dirname + '/index.html')
  mainWindow.loadURL('http://localhost:8080/')

  // dereference the mainWindow object when the window is closed
  mainWindow.on('closed', function() {
      mainWindow = null
  })
}

const createTray = () => {
  tray = new Tray(path.join(assetsDirectory, 'eth.png'))
  tray.setTitle('--')

  const contextMenu = Menu.buildFromTemplate([
    {label: 'Quit', type: 'normal', click: () => {
      app.quit()
    }}
  ])

  tray.setContextMenu(contextMenu)
  tray.on('click', function (event) {

  })
}

const fetchPrice = () => {

  fetch('https://api.gdax.com/products/ETH-USD/ticker')
    .then(res => res.json())
    .then(body => {
      var price = parseFloat(body.price)

      if (isNaN(price)) {
        return
      }

      price = price.toFixed(2)
      tray.setTitle('$' + price)
    })
    // .then(function(){
    //   tray.setHighlightMode('never')
    // })
}

const startTick = () => {
  setInterval(fetchPrice, 60000)
}