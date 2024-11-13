import fs from 'fs/promises';

import Link from 'next/link';

import { underscoreToSpace } from '@/lib/utils';

const examplesPath = './examples';

// Get files from examples folder, only *.input.json, and remove endings //
// Possible filenames - [a-zA-Z0-9\-_] //
// _ is for space //
async function getExamples() {
  const files = await fs.readdir(examplesPath);
  return files.filter((file) => file.endsWith('.input.json')).map((file) => file.replace(/\.input\.json$/g, ''));
}

export default async function Page() {
  const examples = await getExamples();

  return (
    <>
      <h1>JSON Gallery</h1>
      {examples.map((example) => (
        <Link href={`/gallery/${example}`} className="no-underline" key={example}>
          <button className="btn mt-2 block">{underscoreToSpace(example)}</button>
        </Link>
      ))}
    </>
  );
}
