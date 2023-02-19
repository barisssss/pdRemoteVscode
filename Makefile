PROJECT = "Pd Remote VS Code"
VERSION=${shell cat package.json | grep version | cut -d '"' -f 4}
PACKAGE = pd-remote-vscode-${VERSION}.vsix

all: $(PACKAGE)

# This needs to be run once, as root, or nothing will work.
install-vsce:
	@echo "Installing vsce..."
	npm install -g @vscode/vsce

# If it isn't needed any more.
uninstall-vsce:
	@echo "Uninstalling vsce..."
	npm uninstall -g @vscode/vsce

$(PACKAGE): node_modules package.json src/extension.ts
	@echo "Building $(PROJECT)..."
	vsce package

node_modules:
	@echo "Installing dependencies..."
	npm install

# Do *not* run this as root.
install: all
	@echo "Installing $(PROJECT)..."
	@echo "Version: $(VERSION)"
	code --install-extension $(PACKAGE)

# Delete build artifacts.
clean:
	@echo "Cleaning $(PROJECT)..."
	rm -rf node_modules out *.vsix
