import { readFile } from "node:fs/promises";
import path from "node:path";
import Markdoc, { type Node } from "@markdoc/markdoc";

const topics = [
  ["getting-started", "Getting started", "Variables, arguments, and the basics."],
  ["bash-parameter-expansion", "Parameter expansion", "A little more out of your variables."],
  ["bash-arrays", "Arrays", "Lists, keys, and working with collections."],
  ["bash-conditions-and-flow-control", "Conditions & flow control", "Tests, comparisons, and decisions."],
  ["bash-loops", "Loops", "Doing things more than once."],
  ["bash-functions", "Functions", "Small pieces you can use again."],
  ["arithmetic-operations", "Arithmetic", "Working with numbers in the shell."],
  ["command-line-chaining-operators", "Chaining commands", "Connecting commands and their results."],
  ["bash-redirections", "Redirections", "Getting input and output where they belong."],
  ["bash-options", "Shell options", "Changing how Bash behaves."],
  ["bash-history", "History", "Finding that command you ran earlier."],
  ["bash-built-in-commands", "Built-in commands", "Tools that come with the shell."],
  ["regular-expressions", "Regular expressions", "Patterns, character classes, and matching."],
] as const;

export function nodeText(node: Node): string {
  return [node.attributes.content || "", ...node.children.map(nodeText)].filter(Boolean).join(" ");
}

export async function getBashNotes() {
  return Promise.all(topics.map(async ([slug, title, description]) => {
    const source = await readFile(path.join(process.cwd(), "content", "bash", `${slug}.md`), "utf8");
    const document = Markdoc.parse(source);
    const cards: { id: string; title: string; nodes: Node[]; searchText: string }[] = [];
    let heading = "Overview";
    let nodes: Node[] = [];
    function flush() {
      if (!nodes.length) return;
      cards.push({ id: `${slug}-${cards.length + 1}`, title: heading, nodes, searchText: nodes.map(nodeText).join(" ") });
      nodes = [];
    }
    for (const [index, node] of document.children.entries()) {
      if (node.type === "heading") {
        flush();
        if (index !== 0) heading = nodeText(node).replace(/\*\*/g, "");
      } else if (node.type !== "hr") {
        const body = node.type === "table" ? node.children.find(child => child.type === "tbody") : undefined;
        if (body && body.children.length > 8) {
          flush();
          const header = node.children.find(child => child.type === "thead");
          for (let offset = 0; offset < body.children.length; offset += 8) {
            const table = new Markdoc.Ast.Node("table", {}, [
              ...(header ? [header] : []),
              new Markdoc.Ast.Node("tbody", {}, body.children.slice(offset, offset + 8)),
            ]);
            cards.push({ id: `${slug}-${cards.length + 1}`, title: `${heading}${offset ? " · continued" : ""}`, nodes: [table], searchText: nodeText(table) });
          }
        } else {
          nodes.push(node);
        }
      }
    }
    flush();
    return { slug, title, description, cards };
  }));
}
