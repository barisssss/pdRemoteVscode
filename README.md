# pd-remote-vscode README

This extension aims to mirror the features of Albert Graefs Emacs-based [Pd-Remote](https://github.com/agraef/pd-remote) as a Visual Studio Code Extension.

## Packaging the extension

### Run `make build` OR

1. Install VS Codes extension manager vsce from npm  
```npm install -g @vscode/vsce```
2. In the repositorys root directory, run  
```vsce package```

## Installing the extension

### Run `make install` OR

#### a) Through the GUI

1. Go to the Extensions Tab in VS Codes Sidebar
2. Click the "..." symbol at the top of the Extensions Window
3. Select "Install from VSIX"
4. Select your previously packaged or downloaded .vsix file

#### b) Through the CLI

1. [Make sure you have installed VS Code in PATH](https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line)
2. Run
```code --install-extension [extension-name].vsix```

## Usage

You may use the [examples in Albert Graefs Repository](https://github.com/agraef/pd-remote/tree/main/examples) to test the extension.
The default connection is opened on localhost:4711 over UDP. You may change these values in VSCodes workspace or user settings.

### Supported Commands

Following Commands are supported as of now. You may invoke them either by searching for them in VSCodes Command Prompt (```cmd+Shift+P```) or by using the Keybindings (which can be changed in VSCodes Keybinding Settings).

| Command Prompt Name              | Default Keybinding | Message Sent |
| -------------------------------- | ------------------ | ------------ |
| Pd-Remote: Create pdsend Process |                    | Starts the pdsend process |
| Pd-Remote: Kill pdsend Process   |                    | Kills the pdsend process |
| Pd-Remote: Send Start            | ctrl+c ctrl+s      | Start (sends a `play 1` message) |
| Pd-Remote: Send Stop             | ctrl+c ctrl+t      | Stop (sends a `play 0` message) |
| Pd-Remote: Send Restart          | ctrl+c ctrl+g      | Restart (sends `play 0,` then `play 1`) |
| Pd-Remote: Send DSP On           | ctrl+/             | DSP on (`pd dsp 1`) |
| Pd-Remote: Send DSP Off          | ctrl+.             | DSP off (`pd dsp 0`) |
| Pd-Remote: Send Compile          | ctrl+c ctrl+k      | Sends a Faust Compile message (`faustgen2~ compile`) |
| Pd-Remote: Send Message          | ctrl+c ctrl+m      | Prompts for a message to send to Pd |
