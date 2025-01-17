// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
const jsdom = require('jsdom');
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { JSDOM } = jsdom;

export const setupDom = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const dom = new JSDOM();

  const _window = global.window;
  const _document = global.document;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  global.window = dom.window;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  global.document = dom.window.document;

  return () => {
    global.window = _window;
    global.document = _document;
  };
};
