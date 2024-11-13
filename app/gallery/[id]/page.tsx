import fs from 'fs/promises';
import path from 'path';

import Link from 'next/link';

import { notFound } from 'next/navigation';

import { variables } from '@/app/variables';
import { stringifyWithSpaces, underscoreToSpace } from '@/lib/utils';

const examplesPath = './examples';

// Get example //
async function getExampleContent(id: string, type: 'input' | 'output') {
  // Check that id is correct //
  if (!/^[a-zA-Z0-9\-_]+$/.test(id)) {
    return null;
  }

  try {
    const content = await fs.readFile(path.join(examplesPath, `${id}.${type === 'input' ? 'input' : 'output'}.json`), 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error('getExampleContent error:', error);
    return null;
  }
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id) {
    return notFound();
  }

  const inputContent = await getExampleContent(id, 'input');
  const outputContent = await getExampleContent(id, 'output');

  const Error = () => <p className="text-red-600">Example not found</p>;

  // I don't format input and output files because then you can use some special formatting inside files if needed //
  return (
    <>
      <h1>JSON Gallery</h1>
      <h2>{underscoreToSpace(id)}</h2>

      {inputContent ? (
        <div>
          <div className="mt-6">
            <h2 className="mb-2 text-lg font-semibold">Template:</h2>
            {inputContent ? (
              <textarea rows={20} className="textarea overflow-x-auto bg-gray-100" defaultValue={stringifyWithSpaces(inputContent)} />
            ) : (
              <Error />
            )}
          </div>
          <div className="mt-6">
            <h2 className="mb-2 text-lg font-semibold">Variables:</h2>
            {variables ? (
              <textarea rows={15} className="textarea overflow-x-auto bg-gray-100" defaultValue={stringifyWithSpaces(variables)} />
            ) : (
              <Error />
            )}
          </div>
          <div className="mt-6">
            <h2 className="mb-2 text-lg font-semibold">Output:</h2>
            {outputContent ? (
              <textarea rows={20} className="textarea overflow-x-auto bg-gray-100" defaultValue={stringifyWithSpaces(outputContent)} />
            ) : (
              <Error />
            )}
          </div>
        </div>
      ) : (
        <Error />
      )}

      <Link href="/gallery">
        <button className="btn mt-5">&larr; Back to Gallery</button>
      </Link>
    </>
  );
}
