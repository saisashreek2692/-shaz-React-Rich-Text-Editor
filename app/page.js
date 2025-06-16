'use client';
import dynamic from "next/dynamic";

// Dynamically import the TextEditor for client-side rendering
const TextEditor = dynamic(() => import("./(components)/TextEditor"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex items-center justify-center">
      <TextEditor />
    </main>
  );
}
