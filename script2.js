
const { Samsung, KEYS, APPS } = require('samsung-tv-control')

const config = {
  debug: true, // Default: false
  ip: '192.168.1.6',
  mac: '9c:8c:6e:ab:b9:e6',
  nameApp: 'NodeJS-Test', // Default: NodeJS
  port: 8001, // Default: 8002
  token: '',
}

const control = new Samsung(config)

control.turnOn()
control
  .isAvailable()
  .then(() => {
    // Get token for API
    control.getToken((token) => {
      console.info('# Response getToken:', token)
    })

    // Send key to TV
    control.sendKey(KEYS.KEY_HOME, function (err, res) {
      if (err) {
        throw new Error(err)
      } else {
        console.log(res)
      }
    })

    // Get all installed apps from TV
    control.getAppsFromTV((err, res) => {
      if (!err) {
        console.log('# Response getAppsFromTV', res)
      }
    })

    // Get app icon by iconPath which you can get from getAppsFromTV
    control.getAppIcon(
      `/opt/share/webappservice/apps_icon/FirstScreen/${APPS.YouTube}/250x250.png`,
      (err, res) => {
        if (!err) {
          console.log('# Response getAppIcon', res)
        }
      },
    )

    // Open app by appId which you can get from getAppsFromTV
    control.openApp(APPS.YouTube, (err, res) => {
      if (!err) {
        console.log('# Response openApp', res)
      }
    })

    // Control will keep connection for next messages in 1 minute
    // If you would like to close it immediately, you can use `closeConnection()`
    control.closeConnection()
  })
  .catch((e) => console.error(e))
