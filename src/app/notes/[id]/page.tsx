import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getNote, getNotes } from "@/lib/notes";

export default async function NotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const notes = await getNotes();
  const note = notes.find((item) => item.id === id);

  if (!note) notFound();

  const noteContent = await getNote(id);

  return (
    <main className="max-w-4xl px-5 py-32 mx-auto md:px-10">
      <Link
        href="/notes"
        className="inline-flex items-center gap-2 mb-12 text-gray-500 transition-colors group hover:text-primary-dark"
      >
        <div className="flex items-center justify-center w-8 h-8 transition-all border border-gray-200 rounded-full group-hover:border-primary-dark">
          <ArrowLeft size={16} />
        </div>
        <span className="text-[11px] font-bold tracking-[0.2em] uppercase">
          All Notes
        </span>
      </Link>

      <header className="pb-12 border-b border-gray-200">
        <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
          {note.category ?? "Note"} / {note.date}
        </p>
        <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight text-gray-900 break-keep">
          {note.title}
        </h1>
        <p className="max-w-2xl mt-8 text-base leading-relaxed text-gray-500 break-keep">
          {note.description}
        </p>
      </header>

      <article className="max-w-3xl mt-12 prose prose-slate lg:prose-lg">
        <MDXRemote source={noteContent.content} />
      </article>
    </main>
  );
}

export async function generateStaticParams() {
  const notes = await getNotes();
  return notes.map((note) => ({ id: note.id }));
}
