'use client';

import { useActionState, useRef, useState } from 'react';

import templates from '@/app/processor/templates';

import { variables } from '@/app/variables';

import { stringifyWithSpaces } from '@/lib/utils';

import process from './action';

export default function Page() {
  const [state, formAction, isPending] = useActionState(process, '');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Add state for template and variables //
  const [templateState, setTemplate] = useState(templates[0].value);
  const [variablesState, setVariablesState] = useState(stringifyWithSpaces(variables));

  // Add state for variables textarea (open/close) //
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(true);
  const [isVariablesOpen, setIsVariablesOpen] = useState(false);
  const [replace, setReplace] = useState(true);

  // User select template //
  const templateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let selectedTemplate = e.target.value;
    if (!textareaRef.current) {
      return;
    }

    const start = textareaRef.current.selectionStart || 0;
    const end = textareaRef.current.selectionEnd || 0;
    const text = textareaRef.current.value || '';
    const before = text.substring(0, start);
    const after = text.substring(end, text.length);

    // Update the textarea value and state //
    if (replace) {
      setTemplate(selectedTemplate);
    } else {
      // Add extra \n at the end and, if needed, on the beginning //
      selectedTemplate = (before.length > 0 ? '\n' : '') + selectedTemplate + '\n';
      setTemplate(before + selectedTemplate + after);

      // Set cursor position after inserted text //
      setTimeout(() => {
        textareaRef.current!.selectionStart = textareaRef.current!.selectionEnd = start + selectedTemplate.length;
        textareaRef.current!.focus();
      }, 0);
    }

    // Reset selection //
    e.target.selectedIndex = 0;
  };

  return (
    <>
      <h1>Awesome JSON Processor</h1>
      <form action={formAction}>
        <div className="mb-4">
          <label htmlFor="templateSelect" className="mb-2 block">
            Pre-defined Templates:
          </label>
          <div className="flex flex-row items-center justify-center">
            <select id="templateSelect" className="w-full rounded-lg border px-3 py-2 text-gray-700 focus:outline-none" onChange={templateChange}>
              <option value="">Choose a template...</option>
              {templates.map((template, index) => (
                <option key={index} value={template.value}>
                  {template.name}
                </option>
              ))}
            </select>
            <div className="ml-4 flex">
              <input
                type="checkbox"
                id="replaceCheckbox"
                checked={replace}
                className="mr-2 size-5 h-5 w-5"
                onChange={(e) => setReplace(e.target.checked)}
              />
              <label htmlFor="replaceCheckbox" className="select-none">
                Replace
              </label>
            </div>
          </div>
        </div>
        <div>
          <div className="mb-2">
            <label htmlFor="template">
              Template: <span className="text-gray-400">(must be in proper JSON format)</span>
            </label>
            <button className="ml-2 px-3" title={isTemplatesOpen ? 'Collapse' : 'Expand'} onClick={() => setIsTemplatesOpen(!isTemplatesOpen)}>
              {isTemplatesOpen ? '▲' : '▼'}
            </button>
          </div>
          <textarea
            ref={textareaRef}
            name="template"
            id="template"
            rows={isTemplatesOpen ? 20 : 2}
            className="w-full rounded-lg border px-3 py-2 text-gray-700 focus:outline-none"
            placeholder="Enter your JSON template here..."
            value={templateState}
            onChange={(e) => setTemplate(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-2">
            <label htmlFor="variables">
              Variables: <span className="text-gray-400">(must be in proper JSON format)</span>
            </label>
            <button className="ml-2 px-3" title={isVariablesOpen ? 'Collapse' : 'Expand'} onClick={() => setIsVariablesOpen(!isVariablesOpen)}>
              {isVariablesOpen ? '▲' : '▼'}
            </button>
          </div>
          <textarea
            name="variables"
            id="variables"
            rows={isVariablesOpen ? 20 : 2}
            className="textarea"
            placeholder="Enter your Variables here..."
            value={variablesState}
            onChange={(e) => setVariablesState(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <button type="submit" className="btn btn-primary" disabled={isPending}>
            Process
          </button>
        </div>
        {state && (
          <div className="mt-6">
            <h2 className="mb-2 text-lg font-semibold">Output:</h2>
            <textarea rows={30} className="textarea overflow-x-auto bg-gray-100" defaultValue={state} />
          </div>
        )}
      </form>
    </>
  );
}
