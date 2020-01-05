const builder = require('electron-builder');

builder.build({
  targets: builder.Platform.WINDOWS.createTarget(),
  config: {
    appId: 'com.sadrasamadi.metaman'
  }
}).then(() => console.log('built successfully'))
  .catch(err => console.error(err));
