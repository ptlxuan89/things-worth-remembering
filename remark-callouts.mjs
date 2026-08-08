/**
 * Tiny remark plugin: turns GitHub-style callout blockquotes into styled divs.
 *
 * Usage in markdown:
 *   > [!note] Optional title
 *   > Body text here.
 *
 * Supported types: note, tip, warn, idea
 * No external dependencies — walks the mdast tree manually.
 */

const TYPES = ['note', 'tip', 'warn', 'idea'];
// Soft line breaks keep following lines inside the same text node,
// so only match up to the first newline.
const MARKER = /^\[!(note|tip|warn|idea)\][ \t]*([^\n]*)\n?/i;

function walk(node, fn) {
  fn(node);
  if (node.children) {
    for (const child of node.children) walk(child, fn);
  }
}

export default function remarkCallouts() {
  return (tree) => {
    walk(tree, (node) => {
      if (node.type !== 'blockquote' || !node.children?.length) return;

      const first = node.children[0];
      if (first.type !== 'paragraph' || !first.children?.length) return;

      const firstText = first.children[0];
      if (firstText.type !== 'text') return;

      const match = firstText.value.match(MARKER);
      if (!match) return;

      const type = match[1].toLowerCase();
      if (!TYPES.includes(type)) return;

      const title = match[2].trim() || type;

      // Strip the marker line from the first paragraph
      firstText.value = firstText.value.replace(MARKER, '');
      if (firstText.value === '' && first.children.length === 1) {
        node.children.shift();
      }

      // Re-tag the blockquote as a callout div with a title element
      node.data = node.data || {};
      node.data.hName = 'div';
      node.data.hProperties = { className: ['callout', `callout-${type}`] };

      node.children.unshift({
        type: 'paragraph',
        data: {
          hName: 'p',
          hProperties: { className: ['callout-title'] },
        },
        children: [{ type: 'text', value: title }],
      });
    });
  };
}
