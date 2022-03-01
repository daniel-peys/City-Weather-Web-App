/**
 * 
 * @returns query string params
 */
function getParams() {
    return new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
}

export { getParams };