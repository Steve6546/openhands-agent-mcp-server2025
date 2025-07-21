// tools/resilienceAdvisor.js - أداة تقوية المشروع ضد الأعطال والتكرار
const retry = require('retry');

/**
 * يحاول تنفيذ fn() مع retries و timeout
 * @param {() => Promise<any>} fn
 * @param {{ retries?: number, timeout?: number }} opts
 */
async function withRetry(fn, opts = {}) {
  const { retries = 3, timeout = 5000 } = opts;
  return new Promise((resolve, reject) => {
    const operation = retry.operation({ retries });
    operation.attempt(() => {
      const timer = setTimeout(() => {
        if (operation.retry(new Error('Timeout'))) return;
      }, timeout);

      fn()
        .then(result => {
          clearTimeout(timer);
          resolve(result);
        })
        .catch(err => {
          clearTimeout(timer);
          if (!operation.retry(err)) {
            reject(operation.mainError());
          }
        });
    });
  });
}

/**
 * fallback بسيط عند فشل الأداة
 */
async function withFallback(tool, params, err) {
  return {
    error: `Tool "${tool}" failed after retries.`,
    details: err.message,
    fallbackTool: null
  };
}

module.exports = { withRetry, withFallback };