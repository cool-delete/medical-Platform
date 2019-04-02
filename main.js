// Modules to control application life and create native browser window
//模块是用来控制应用的生命周期还有创建本地原生窗口
const { app, BrowserWindow } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
//保持一个windows对象的全局引用 如果不这样做 当js对象被垃圾回收时候窗口也会被销毁
let mainWindow

function createWindow() {
  // Create the browser window.
  //创建一个浏览窗口
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      //为窗口注入node相关api,默认值为true 
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.

  //为该应用加载index.html
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  //当关闭窗口时清空对象
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
//createWindow方法会当ele初始化完成还有准备创建浏览器窗口的时候被调用
//部分api会在ready事件发生后才能被使用
app.on('ready', createWindow)

// Quit when all windows are closed.
//当所有窗口被关闭的时候退出

app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {//不是mac情况下可以直接退出
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

let server;
let mClient = require('mongodb').MongoClient;
let DB_CONN_STR = 'mongodb://cn3333.88ip.org:27017/Pursue Tracing';
//http://cn3333.88ip.org:27017/
var selectData = function (db, callback) {
  //连接到表 
  var collection = db.collection('localHospital');
  //查询数据
  var whereStr = { "医院名称": '十大' };
  collection.find(whereStr, function (error, cursor) {
    cursor.forEach(function (error, doc) {
      if (doc) {
        //console.log(doc);
        if (doc["医院名称"]) {
          console.log("addTime: " + doc["医院名称"]);
          console.log("ad");
        }
      }
    });

  });

}

mClient.connect(DB_CONN_STR, { useNewUrlParser: true }, function (err, mClient) {
  console.log("已连接!");
  selectData(mClient.db('localhospital'), function (result) {
    console.log(result);
    db.close();
  });
});

