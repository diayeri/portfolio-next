import Link from "next/link";
import { ArrowUpRight, NotebookPen } from "lucide-react";
import { getNotes } from "@/lib/notes";

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <main className="max-w-5xl px-5 py-32 mx-auto md:px-10">
      <header className="max-w-2xl mb-16">
        <h1 className="flex items-center gap-4 text-5xl font-bold tracking-tight text-gray-900 md:text-6xl">
          <NotebookPen size={60} aria-hidden="true" />
          Notes
        </h1>
        {/* <p className="mt-6 text-base leading-relaxed text-gray-500 break-keep">
          디자인과 개발 사이에서 경험한 역할과 구조를 정리해 둡니다.
        </p> */}
      </header>

      <div className="border-t border-gray-200">
        {notes.map((note, index) => (
          <Link
            key={note.id}
            href={`/notes/${note.id}`}
            className="group grid gap-4 py-8 border-b border-gray-200 transition-colors md:grid-cols-[120px_1fr_auto] md:items-start md:gap-8"
          >
            <div className="flex justify-between gap-1 md:flex-col md:gap-1">
              <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">
                {note.category ?? "Note"} /
              </span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-primary">
                {note.date}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 transition-colors group-hover:text-primary-dark">
                {note.title}
              </h2>
              <p className="max-w-2xl mt-3 text-sm leading-relaxed text-gray-500 break-keep md:text-base">
                {note.description}
              </p>
            </div>
            <ArrowUpRight
              className="hidden text-gray-400 transition-transform md:block group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary"
              size={22}
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>
    </main>
  );
}
