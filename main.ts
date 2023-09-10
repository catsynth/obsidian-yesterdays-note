import { isMoment } from 'moment';
import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { getAllDailyNotes, getDailyNote, createDailyNote } from  'obsidian-daily-notes-interface'
import type { Moment } from "moment";

// Remember to rename these classes and interfaces!

export default class YesterdayPlugin extends Plugin {

	async onload() {

	
		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'open-yesterday-note',
			name: 'Open yesterday\'s Daily Note',
			callback: async () => {
				const today = moment()
				const yesterday = today.subtract(1,'days')
				const dailyNotes = getAllDailyNotes()
				var note = getDailyNote(yesterday,dailyNotes)
				console.log(note)
				if (note != null) {
					let leaf = this.app.workspace.getLeaf(false);
					await leaf.openFile(note, { active: true });
				} else {
					note = await createDailyNote(yesterday)
					let leaf = this.app.workspace.getLeaf(false);
					await leaf.openFile(note, { active: true });
				}
			}
		});
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'yesterday-editor-command',
			name: 'Insert link to yesterday\'s Daily Note',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				const today = moment()
				const yesterday = today.subtract(1,'days')
				const dailyNotes = getAllDailyNotes()
				var note = getDailyNote(yesterday,dailyNotes)
				console.log(note)
				if (note == null) {
					note = await createDailyNote(yesterday)
				}
				editor.replaceSelection('[['+note.basename+']]')
			}
		});
	}

	

	onunload() {

	}

}

