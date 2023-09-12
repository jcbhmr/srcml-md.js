import { fromMarkdown } from 'mdast-util-from-markdown';
import { JSDOM } from 'jsdom';

const DOMException = Error;

const window: Window = new JSDOM().window;
const { document, Document, Text, XMLSerializer } = window;

function parseMD(sourceText: string): Document {
  const document = new Document();

  const x = fromMarkdown(sourceText);
  document.append(toElement(x));

  return document;
}

function toElement(x: any) {
  console.log(x);
  switch (x.type) {
    case 'root': {
      const y = document.createElement('unit');
      y.setAttribute('language', 'Markdown');
      y.setAttribute('revision', '1.0.0');
      y.position = x.position;
      for (const z of x.children) {
        y.append(toElement(z));
      }
      return y;
    }
    case 'heading': {
      const y = document.createElement('h1');
      y.position = x.position;
      for (const z of x.children) {
        y.append(toElement(z));
      }
      return y;
    }
    case 'text': {
      const y = new Text(x.value);
      y.position = x.position;
      return y;
    }
    default:
      throw new DOMException(`${x.type} is not valid`, 'NotSupportedError');
  }
}

const x = parseMD('# Hello world!');
console.log(new XMLSerializer().serializeToString(x));
