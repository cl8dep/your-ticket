import React, { useState } from 'react';
import MDEditor, { commands } from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";
import onImagePasted from '@/utils/onImagePasted';

interface CustomMarkdownEditorProps {
    onChange: (value: string) => void;
    value: string
}

const CustomMarkdownEditor = (props: CustomMarkdownEditorProps) => {

    return (
        <MDEditor height={400}
            value={props.value ? props.value : ""}
            onChange={(value) => props.onChange && props.onChange(value || "")}
            commandsFilter={(cmd) => {
                return cmd.name !== commands.codeLive.name ? cmd : false
            }}
            preview="edit"
            previewOptions={{
                rehypePlugins: [[rehypeSanitize]],
            }}
            visibleDragbar
            highlightEnable
            onPaste={async (event) => {
                await onImagePasted(event.clipboardData, props.onChange);
            }}
            onDrop={async (event) => {
                event.preventDefault();
                await onImagePasted(event.dataTransfer, props.onChange);
            }}
        />
    )
};

export default CustomMarkdownEditor;