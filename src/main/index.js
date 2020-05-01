"use strict";

import { app, BrowserWindow, Tray, Menu } from "electron";
import path from "path";
import axios from "axios";

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== "development") {
  global.__static = require("path")
    .join(__dirname, "/static")
    .replace(/\\/g, "\\\\");
}

let mainWindow;
let tray;
let selectedCurrency;

const winURL =
  process.env.NODE_ENV === "development"
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
  });

  mainWindow.loadURL(winURL);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", () => {
  createTray();
  startTick();
  fetchPrice();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  console.log("Activating");
  if (mainWindow === null) {
    console.log("creating window");
    createWindow();
  }
});

// const toggleWindow = () => {
//   if (mainWindow.isVisible()) {
//     mainWindow.hide()
//   } else {
//     mainWindow.show()
//     mainWindow.focus()
//   }
// }

const currencies = {
  eth: {
    image: "eth.png",
    gdaxId: "ETH-USD",
  },
  xtz: {
    image: "tezos.png",
    gdaxId: "XTZ-USD",
  },
};

selectedCurrency = currencies["xtz"];

const selectCurrency = (currencyId) => {
  selectedCurrency = currencies[currencyId];
  fetchPrice();
  tray.setImage(path.join(__static, selectedCurrency.image));
};

const createTray = () => {
  tray = new Tray(path.join(__static, selectedCurrency.image));
  tray.setTitle("--");

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "ETH",
      type: "normal",
      click: () => {
        selectCurrency("eth");
      },
    },
    {
      label: "XTZ",
      type: "normal",
      click: () => {
        selectCurrency("xtz");
      },
    },
    {
      label: "Quit",
      type: "normal",
      click: () => {
        app.quit();
      },
    },
  ]);

  tray.setContextMenu(contextMenu);
  tray.on("click", function (event) {});
};

const fetchPrice = async () => {
  console.log("fetching Price", selectedCurrency);

  const { gdaxId } = selectedCurrency;

  const response = await axios.get(
    `https://api.gdax.com/products/${gdaxId}/ticker`
  );

  const body = response.data;
  var price = parseFloat(body.price);

  if (isNaN(price)) {
    return;
  }

  price = price.toFixed(2);
  tray.setTitle("$" + price);

  // .then(function(){
  //   tray.setHighlightMode('never')
  // })
};

const startTick = () => {
  setInterval(fetchPrice, 60000);
};

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
