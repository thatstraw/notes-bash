"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Topic = {
  slug: string;
  title: string;
  description: string;
  cards: { id: string; title: string; searchText: string; content: ReactNode }[];
};

export function BashReference({ topics }: { topics: Topic[] }) {
  const [query, setQuery] = useState("");
  const search = useRef<HTMLInputElement>(null);
  const normalized = query.trim().toLowerCase();
  const terms = normalized.split(/\s+/).filter(Boolean);
  const filtered = topics.map(topic => ({ ...topic, cards: topic.cards.filter(card => {
    const text = `${topic.title} ${card.title} ${card.searchText}`.toLowerCase();
    return terms.every(term => text.includes(term));
  }) })).filter(topic => topic.cards.length);
  const count = filtered.reduce((total, topic) => total + topic.cards.length, 0);

  useEffect(() => {
    function shortcut(event: KeyboardEvent) {
      const target = event.target as HTMLElement;
      if (event.key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey && !target.closest("input, textarea, select, [contenteditable]")) {
        event.preventDefault();
        search.current?.focus();
      }
    }
    document.addEventListener("keydown", shortcut);
    return () => document.removeEventListener("keydown", shortcut);
  }, []);

  return <>
    <div className="bash-search-strip bash-wrap">
      <div className="bash-search-field">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/></svg>
        <label className="bash-sr-only" htmlFor="bash-search">Search Bash notes</label>
        <input ref={search} id="bash-search" type="search" placeholder="Find a command, concept, or example…" value={query} onChange={event => setQuery(event.target.value)} onKeyDown={event => { if (event.key === "Escape") setQuery(""); }} />
        {query ? <button type="button" onClick={() => { setQuery(""); search.current?.focus(); }}>Clear</button> : <kbd aria-hidden="true">/</kbd>}
      </div>
      <span className="bash-results" role="status">{normalized ? `${count} matching ${count === 1 ? "card" : "cards"}` : `${topics.length} topics · ${count} reference cards`}</span>
    </div>
    <div className="bash-layout bash-wrap">
      <aside className="bash-toc">
        <span className="bash-label">IN THESE NOTES</span>
        <nav aria-label="Bash topics">{topics.map((topic, index) => <a key={topic.slug} href={`#${topic.slug}`} onClick={() => setQuery("")}><span>{String(index + 1).padStart(2, "0")}</span>{topic.title}</a>)}</nav>
        <p><a href="https://github.com/thatstraw/notes-bash">Source & contributions ↗</a></p>
        <a className="bash-back-top" href="#top">Back to top ↑</a>
      </aside>
      <div className="bash-topics">
        {filtered.map(topic => <section key={topic.slug} id={topic.slug} className="bash-topic" aria-labelledby={`${topic.slug}-title`}>
          <div className="bash-topic-heading"><div><span className="bash-label">{String(topics.findIndex(item => item.slug === topic.slug) + 1).padStart(2, "0")} / {topic.cards.length} CARDS</span><h2 id={`${topic.slug}-title`}><a href={`#${topic.slug}`}>{topic.title}<span aria-hidden="true"> ↗</span></a></h2><p>{topic.description}</p></div><a className="bash-edit-link" href={`https://github.com/thatstraw/notes-bash/edit/main/content/bash/${topic.slug}.md`}>Edit these notes ↗</a></div>
          {topic.slug === "regular-expressions" && <p className="bash-caution">Regex syntax depends on the tool. Bash’s <code>[[ =~ ]]</code> uses POSIX extended expressions; shorthand classes, lookarounds, and modifiers listed here are not supported everywhere.</p>}
          {topic.slug === "bash-options" && <p className="bash-caution">Some options need a newer Bash. Check <code>bash --version</code>; the default shell on macOS may differ.</p>}
          <div className="bash-card-grid">{topic.cards.map(card => <article key={card.id} id={card.id} className="bash-card"><h3><a href={`#${card.id}`}>{card.title}</a></h3><div className="bash-card-body">{card.content}</div></article>)}</div>
        </section>)}
        {!filtered.length && <div className="bash-empty"><h2>Nothing here for “{query}”.</h2><p>Try a command like <code>echo</code>, or a topic like arrays.</p><button type="button" onClick={() => { setQuery(""); search.current?.focus(); }}>Show all notes</button></div>}
      </div>
    </div>
  </>;
}
