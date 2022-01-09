import requestIdleCallbackPolyfill from './requestIdleCallback';

// Registers polyfills for the current browser.
export default () => {
    if (typeof window === 'undefined') return;

    requestIdleCallbackPolyfill();
}