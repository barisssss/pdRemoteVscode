PROJECT = "Pd Remote VS Code"
VERSION=${shell cat package.json | grep version | cut -d '"' -f 4}

build:
	@echo "Building $(PROJECT)..."
	npm install -g @vscode/vsce
	vsce package
	@echo "Done."

install:
	@echo "Installing $(PROJECT)..."
	@echo "Version: $(VERSION)"
	code --install-extension pd-remote-vscode-${VERSION}.vsix
	@echo "Done."