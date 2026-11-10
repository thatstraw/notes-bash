import type { Metadata } from "next";
import Markdoc from "@markdoc/markdoc";
import React from "react";
import { ThemeToggle } from "./ThemeToggle";
import { getBashNotes } from "../lib/bash-notes";
import { BashReference } from "./BashReference";
import { CodeBlock } from "./CodeBlock";
import "./bash.css";

export const metadata: Metadata = {
  title: "Bash notes — traw.sh",
  description: "My shell scripting notes, in one searchable place. Bash variables, arrays, loops, functions, redirections, and the commands I keep looking up.",
  alternates: { canonical: "https://bash.traw.sh" },
  openGraph: { title: "Bash notes — traw.sh", url: "https://bash.traw.sh", description: "A small reference for the shell things I keep forgetting." },
};

export default async function BashPage() {
  const notes = await getBashNotes();
  const topics = notes.map(topic => ({ ...topic, cards: topic.cards.map(card => {
    const document = new Markdoc.Ast.Node("document", {}, card.nodes);
    const transformed = Markdoc.transform(document, {
      nodes: {
        fence: {
          render: "CodeBlock",
          attributes: { content: { type: String }, language: { type: String } },
          transform(node, config) { return new Markdoc.Tag("CodeBlock", node.transformAttributes(config)); },
        },
      },
    });
    return { id: card.id, title: card.title, searchText: card.searchText, content: Markdoc.renderers.react(transformed, React, { components: { CodeBlock } }) };
  }) }));

  return <main className="portfolio-shell bash-page" id="top">
    <a className="bash-skip" href="#bash-search">Skip to search</a>
    <header className="bash-header bash-wrap"><a className="editorial-brand" href="https://traw.sh" aria-label="traw.sh home"><span className="semicolon-mark" aria-hidden="true">;</span></a><a className="bash-home-link" href="https://traw.sh">← Back to traw.sh</a><a className="bash-github-link" href="https://github.com/thatstraw/notes-bash">Contribute on GitHub ↗</a><ThemeToggle /></header>
    <section className="bash-hero bash-wrap"><span className="bash-label"><span className="bash-small-dot"/> TRAW’S FIELD NOTES / BASH</span><h1>A few notes.<br/>A lot of <span>Bash.</span></h1><div className="bash-hero-bottom"><p>I wrote these while finding my way around the shell. Now they’re here for the next time I forget how something works. Maybe they’ll save you a search, too.</p><span className="bash-hero-aside">Less remembering.<br/>More making things work.</span></div></section>
    <BashReference topics={topics} />
    <footer className="bash-footer bash-wrap"><p>Notes by <a href="https://traw.sh/about">Traw</a>. Still learning, still adding things.</p><div><a href="https://www.gnu.org/software/bash/manual/">Bash manual ↗</a><a href="mailto:hi@traw.sh">Spotted a mistake?</a><a href="#top">Back to top ↑</a></div><small>Layout inspired by <a href="https://quickref.me/bash">QuickRef</a>. Examples are notes, not commands to run blindly.</small></footer>
  </main>;
}
