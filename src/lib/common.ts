import * as vscode from 'vscode';

export function getSelectedText(editor = vscode.window.activeTextEditor) {
  if (!editor) {
    return;
  }
  const selectedText = editor.document.getText(editor.selection);
  return selectedText;
}

export function replaceSelectedText(
  value: string,
  editor = vscode.window.activeTextEditor
) {
  if (!editor) {
    return;
  }
  editor.edit(builder => {
    builder.replace(editor.selection, value);
  });
}

export function showInformation(message: string) {
  vscode.window.showInformationMessage(message);
}