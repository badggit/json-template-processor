import Link from 'next/link';

export default function Home() {
  return (
    <>
      <h1>Welcome!</h1>
      <p>This is a simple tool to process JSON templates. It can be used to generate JSON data from templates.</p>
      <p className="mt-2 flex">
        <Link href="./processor">
          <button className="btn btn-primary">JSON processor</button>
        </Link>
        <Link href="./gallery">
          <button className="btn ml-6">Gallery</button>
        </Link>
      </p>
    </>
  );
}
