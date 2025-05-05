// src/__tests__/index.test.ts
/**
 * Test suite for dhvagna-dom package
 */
// For tests we're importing directly from the source, but this comment shows how users would import
// import dhvagnaDom from 'dhvagna-dom';
import { dhvagnaDom } from '../index';

describe('dhvagnaDom', () => {
    // Mock document and window
    const originalAddEventListener = document.addEventListener;
    const originalRemoveEventListener = document.removeEventListener;

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
        document.addEventListener = originalAddEventListener;
        document.removeEventListener = originalRemoveEventListener;
        // Reset readyState mock if set
        if ((document as any).readyState !== undefined) {
            delete (document as any).readyState;
        }
    });

    test('should execute callback immediately if DOM is already complete', () => {
        // Mock document.readyState
        Object.defineProperty(document, 'readyState', {
            configurable: true,
            get: function () { return 'complete'; }
        });

        const callback = jest.fn();
        dhvagnaDom(callback);

        jest.runAllTimers();
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('should add event listeners if DOM is still loading', () => {
        // Mock document.readyState
        Object.defineProperty(document, 'readyState', {
            configurable: true,
            get: function () { return 'loading'; }
        });

        // Mock addEventListener
        document.addEventListener = jest.fn();
        window.addEventListener = jest.fn();

        const callback = jest.fn();
        dhvagnaDom(callback);

        expect(document.addEventListener).toHaveBeenCalledWith('DOMContentLoaded', expect.any(Function));
        expect(window.addEventListener).toHaveBeenCalledWith('load', expect.any(Function));
    });

    test('should execute callback when DOMContentLoaded fires', () => {
        // Mock document.readyState
        Object.defineProperty(document, 'readyState', {
            configurable: true,
            get: function () { return 'loading'; }
        });

        const callback = jest.fn();
        let domReadyHandler: EventListener | undefined;

        // Mock addEventListener to capture the handler
        document.addEventListener = jest.fn((event: string, handler: EventListenerOrEventListenerObject) => {
            if (event === 'DOMContentLoaded') {
                domReadyHandler = typeof handler === 'function' ? handler : handler.handleEvent.bind(handler);
            }
        });
        document.removeEventListener = jest.fn();
        window.addEventListener = jest.fn();
        window.removeEventListener = jest.fn();

        dhvagnaDom(callback);

        // Make sure handler was actually set
        expect(domReadyHandler).toBeDefined();

        // Simulate DOMContentLoaded event
        if (domReadyHandler) {
            domReadyHandler(new Event('DOMContentLoaded'));
        }

        expect(callback).toHaveBeenCalledTimes(1);
        expect(document.removeEventListener).toHaveBeenCalled();
        expect(window.removeEventListener).toHaveBeenCalled();
    });

    test('should use timeout option if provided', () => {
        // Mock document.readyState
        Object.defineProperty(document, 'readyState', {
            configurable: true,
            get: function () { return 'loading'; }
        });

        const callback = jest.fn();

        // Mock event listeners
        document.addEventListener = jest.fn();
        window.addEventListener = jest.fn();

        dhvagnaDom(callback, { timeout: 5000 });

        // Fast-forward time
        jest.advanceTimersByTime(5000);

        // Callback should be called after timeout
        expect(callback).toHaveBeenCalledTimes(1);
    });
});