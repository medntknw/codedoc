import { useState, useRef, useEffect } from "react";
import Editor from '@monaco-editor/react';
import Stack from '@mui/material/Stack';
import { useParams } from 'react-router-dom';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from 'y-monaco';
import LanguageSelector from './LanguageSelector';
import { DEFAULT_LANGUAGE, LANGUAGE_COMMENT } from '../constants';

function Room() {
    const { roomId } = useParams();
    const editorRef = useRef();
    const [provider, setProvider] = useState(null);
    const [binding, setBinding] = useState(null);
    const [value, setValue] = useState(LANGUAGE_COMMENT[DEFAULT_LANGUAGE]);
    const [language, setLanguage] = useState(DEFAULT_LANGUAGE);

    const syncEditor = (editor) => {
        const doc = new Y.Doc();
        const newProvider = new WebsocketProvider('ws://codedoc-backend.onrender.com:80', roomId, doc);
        const ytext = doc.getText("monaco");
        const ymap = doc.getMap("language");

        const newBinding = new MonacoBinding(ytext, editor.getModel(), new Set([editor]), newProvider.awareness);
        
        ymap.observe(event => {
            const newLanguage = ymap.get('currentLanguage');
            if (newLanguage !== language) {
                setLanguage(newLanguage);
            }
        });

        setProvider(newProvider);
        setBinding(newBinding);
    };

    useEffect(() => {
        if (editorRef.current) {
            const editor = editorRef.current;
            
            if (provider) {
                provider.disconnect();
                setProvider(null);
            }
            if (binding) {
                binding.destroy();
                setBinding(null);
            }
            syncEditor(editor);
        }
    }, [roomId, language]);

    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
        syncEditor(editor);
    };

    const onSelect = (selectedLanguage) => {
        if (provider) {
            const ymap = provider.doc.getMap("language");
            ymap.set('currentLanguage', selectedLanguage);
        }
        setValue(LANGUAGE_COMMENT[selectedLanguage]);
    };

    return (
        <Stack>
            <Stack direction="row">
                <LanguageSelector selected={language} onSelect={onSelect} />
            </Stack>
            <Editor 
                height="75vh"
                defaultLanguage={language}
                defaultValue={value}
                value={value}
                theme="vs-dark"
                onMount={onMount}
                onChange={(value, event) => setValue(value)}
            />
        </Stack>
    );
}

export default Room;
