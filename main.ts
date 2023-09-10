import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

// Remember to rename these classes and interfaces!

export default class YesterdayPlugin extends Plugin {
	settings: YesterdayPluginSettings;

	async onload() {
		await this.loadSettings();

		

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'open-yesterday-note',
			name: 'Open yesterday\'s Daily Note',
			callback: () => {
				
			}
		});
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'yesterday-editor-command',
			name: 'Insert link to yesterday\'s Daily Note',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection('Sample Editor Command');
			}
		});


	

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

