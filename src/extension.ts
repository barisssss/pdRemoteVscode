import * as vscode from 'vscode';

let pdSendTerminal: vscode.Terminal | undefined = undefined;

// this function creates a new terminal and starts the pdsend process
// it takes the path to the pdsend executable as an argument
function createPdSendProcess(pdsendPath: string) {
	const port = vscode.workspace.getConfiguration('pd-remote-vscode').get('port');
	const host = vscode.workspace.getConfiguration('pd-remote-vscode').get('hostname');
	const protocol = vscode.workspace.getConfiguration('pd-remote-vscode').get('protocol');

	if (!pdSendTerminal || pdSendTerminal.exitStatus !== undefined) {
		pdSendTerminal = vscode.window.createTerminal('PdSend');
		pdSendTerminal.sendText(`${pdsendPath} ${port} ${host} ${protocol}`);
		vscode.window.showInformationMessage(`Started pdsend process on Port ${port}`);
	}
	pdSendTerminal.show();
}

// this function kills the pdsend process
function killPdSendProcess() {
	pdSendTerminal?.dispose();
	vscode.window.showInformationMessage(`Killed pdsend process`);
}


// this function sends a message to the pdsend process
// it takes the path to the pdsend executable as an argument as well as the message to send
function sendPdsendMessage(pdsendPath: string, message: string) {
	console.log(pdSendTerminal?.exitStatus);
	if (!pdSendTerminal || pdSendTerminal.exitStatus !== undefined) {
		console.log("No terminal found, creating new one");
		createPdSendProcess(pdsendPath);
		sendPdsendMessage(pdsendPath, message);
	} else {
		console.log(`Sending message ${message}`);
		pdSendTerminal?.sendText(message);
		vscode.window.showInformationMessage(`Pd-Remote: Message '${message}' sent.`);
	}
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const pdsendPath = vscode.workspace.getConfiguration('pd-remote-vscode').get('pdsendPath', '') || 'pdsend';
	// currently not used
	const pdreceivePath = vscode.workspace.getConfiguration('pd-remote-vscode').get('pdreceivePath', '') || 'pdreceive';

	let startProcess = vscode.commands.registerCommand('pd-remote-vscode.createPdSendProcess', () => {
		createPdSendProcess(pdsendPath);
	});

	context.subscriptions.push(startProcess);

	let killProcess = vscode.commands.registerCommand('pd-remote-vscode.killPdSendProcess', () => {
		killPdSendProcess();
	});

	context.subscriptions.push(killProcess);

	let sendMessage = vscode.commands.registerCommand('pd-remote-vscode.sendMessage', () => {
		vscode.window.showInputBox({
			prompt: "Enter the message you want to send through the pdsend process:",
			placeHolder: "Message..."
		  }).then(input => {
			if (input) {
				sendPdsendMessage(pdsendPath, input);
			}
		  });
	});

	context.subscriptions.push(sendMessage);

	let sendDspOn = vscode.commands.registerCommand('pd-remote-vscode.sendDspOn', () => {
		sendPdsendMessage(pdsendPath, 'pd dsp 1');
	});

	context.subscriptions.push(sendDspOn);

	let sendDspOff = vscode.commands.registerCommand('pd-remote-vscode.sendDspOff', () => {
		sendPdsendMessage(pdsendPath, 'pd dsp 0');
	});

	context.subscriptions.push(sendDspOff);

	let sendCompile = vscode.commands.registerCommand('pd-remote-vscode.sendCompile', () => {
		sendPdsendMessage(pdsendPath, 'faustgen2~ compile');
	});

	context.subscriptions.push(sendCompile);

	let sendStart = vscode.commands.registerCommand('pd-remote-vscode.sendStart', () => {
		sendPdsendMessage(pdsendPath, 'play 1');
	});

	context.subscriptions.push(sendStart);

	let sendStop = vscode.commands.registerCommand('pd-remote-vscode.sendStop', () => {
		sendPdsendMessage(pdsendPath, 'play 0');
	});

	context.subscriptions.push(sendStop);

	let sendRestart = vscode.commands.registerCommand('pd-remote-vscode.sendRestart', () => {
		sendPdsendMessage(pdsendPath, 'play 0');
		sendPdsendMessage(pdsendPath, 'play 1');
	});

	context.subscriptions.push(sendRestart);
}

// This method is called when your extension is deactivated
export function deactivate() {
	killPdSendProcess();
}

