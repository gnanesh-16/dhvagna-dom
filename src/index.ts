/**
 * dhvagna-dom: A lightweight utility to ensure JavaScript code runs after DOM is fully loaded
 * @param callback Function to execute when DOM is ready
 * @param options Configuration options
 */
export function dhvagnaDom(
    callback: () => void,
    options: { timeout?: number } = {}
): void {
    // Case 1: DOM already loaded
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(callback, 1);
        return;
    }

    // Case 2: DOM still loading - add event listener
    const domReadyHandler = () => {
        document.removeEventListener('DOMContentLoaded', domReadyHandler);
        window.removeEventListener('load', domReadyHandler);
        callback();
    };

    document.addEventListener('DOMContentLoaded', domReadyHandler);
    window.addEventListener('load', domReadyHandler); // Fallback

    // Optional timeout for extra safety
    if (options.timeout) {
        setTimeout(callback, options.timeout);
    }
}

// For backward compatibility and convenience
export const onDomReady = dhvagnaDom;

// Default export
export default dhvagnaDom;