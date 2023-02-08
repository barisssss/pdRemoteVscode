// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';

const port = 4711;
const host = 'localhost';
const protocol = 'udp';

function createPdSendProcess(pdsendPath: string) {
	const terminal = vscode.window.createTerminal('PdSend');
	terminal.sendText(`${pdsendPath} ${port} ${host} ${protocol}`);
}

function killPdSendProcess() {
	const terminal = getRunningTerminal();
	terminal?.dispose();
}

function getRunningTerminal() {
	return vscode.window.terminals.filter((terminal) => terminal.name === "PdSend")[0];
}

function sendPdsendMessage(pdsendPath: string, message: string) {
	const terminal = getRunningTerminal();

	if (!terminal) {
		createPdSendProcess(pdsendPath);
		sendPdsendMessage(pdsendPath, message);
	} else {
		terminal.sendText(message);
		vscode.window.showInformationMessage(`Pd-Remote: Message '${message}' sent.`);
	}
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const pdsendPath = path.join(context.extensionPath, 'res/pdsend');

	let startProcess = vscode.commands.registerCommand('pd-remote-vscode.createPdSendProcess', () => {
		createPdSendProcess(pdsendPath);

		vscode.window.showInformationMessage(`Started pdsend process on Port ${port}`);
	});

	context.subscriptions.push(startProcess);

	let killProcess = vscode.commands.registerCommand('pd-remote-vscode.killPdSendProcess', () => {
		killPdSendProcess();

		vscode.window.showInformationMessage(`Killed pdsend process`);
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

