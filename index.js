import Debug from 'debug';
import BacktraceLogging from 'backtrace-logging';
import assign from 'proxy-assign';

const importMetaUrl = new URL(import.meta.url);
const capacity = Number(importMetaUrl.searchParams?.get?.('capacity')) ?? 10;
const bl = new BacktraceLogging({ capacity });
export const { flush } = bl;

export default function create(namespace) {
  const debug = Debug(namespace);
  const patch = bl.fn(debug);
  return assign(patch, { extend: extendPatch(debug), flush });
}

function extendPatch(org) {
  const extend = org.extend;
  return namespace => {
    const debug = extend.call(org, namespace);
    const patch = bl.fn(debug);
    return assign(patch, { extend: extendPatch(debug), flush });
  };
}

if (typeof process !== 'undefined') {
  process.on('uncaughtExceptionMonitor', flush);
  process.on('beforeExit', code => code && flush());
}
if (typeof window !== 'undefined') {
  window.on('error', flush);
}
