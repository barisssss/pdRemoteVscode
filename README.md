# pd-remote-vscode README

This extension aims to mirror the features of Albert Graefs Emacs-based [Pd-Remote](https://github.com/agraef/pd-remote) as a Visual Studio Code Extension. 

## Packaging the extension

1. Install VS Codes extension manager vsce from npm  
```npm install -g @vscode/vsce```
2. In the repositorys root directory, run  
```vsce package```

## Installing the extension

### a) Through the GUI
1. Go to the Extensions Tab in VS Codes Sidebar
2. Click the "..." symbol at the top of the Extensions Window
3. Select "Install from VSIX"
4. Select your previously packaged or downloaded .vsix file

### b) Through the CLI
1. Make sure you have isntalled VS Code in PATH (see: https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line)
2. Run 
```code --install-extension [extension-name].vsix```