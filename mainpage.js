const electron = require("electron");
const url = require("url");
const path = require("path");

const {app, BrowserWindow, Menu, ipcMain, ipcRenderer} = electron;

let mainWindow;
let addWindow;

//Listen for the app to be ready
app.on('ready', function(){
  //create new window
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });

  //Load html into window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol:'file:',
    slashes:true
  }));
  // Quit app when closed
  mainWindow.on('closed', function(){
    app.quit();
  });

  //Build the menu from the tempelate
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  //Insert the menu
  Menu.setApplicationMenu(mainMenu);
});


// create menu template for the app
const mainMenuTemplate = [
  {
    label: 'File',
    submenu:[
      {
        label:'Quit App',
        accelorator: process.platform == 'darwin' ? 'Command+Q' :
        'ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]
  }
];

if(process.platform == 'darwin'){
  mainMenuTemplate.unshift({
    label: null
  });
}

//Add developer tools item if not in production
if(process.env.NODE_ENV !== 'production'){
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu:[
      {
        label: 'Toggle DevTools',
        accelorator: process.platform == 'darwin' ? 'Command+I' :
        'Ctrl+I',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: 'reload'
      }
    ]
  });
}
