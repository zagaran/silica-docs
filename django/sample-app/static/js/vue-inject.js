/**
 *
 * Used to safely compose data and functions into the global Vue instance.
 * This should be used for page-specific functionality (e.g. controlling modals, showing or hiding text,
 * setting up complex data lookups, etc.) and not for component level functionality (e.g. display functions, props).
 * 
 * Note that this implementation prioritizes the lowest-level keyword value; if a keyword (e.g. onCreated()) is defined 
 * at the root and injected on a child page, the child's definition will override the parent. If this becomes an issue,
 * we could invest some time in figuring out how to do context-binding etc to preserve inherited functionality.
 *
 * @param obj: an object formatted like a Vue instance (e.g. has a data function, methods object, etc).
 *             Note that no parameters are required -- if you only wish to add data or methods or setup or another Vue
 *             object parameter, you may do so.
 */
function injectIntoVueApp(obj) {
    if (!window.hasOwnProperty('VueMethods')) {
        window.VueMethods = {};
    }
    if (!window.hasOwnProperty('VueData')) {
        window.VueData = {};
    }
    if (!window.hasOwnProperty('VueKwargs')) {
        window.VueKwargs = {};
    }
    if (obj.hasOwnProperty('methods')) {
        Object.assign(window.VueMethods, obj.methods);
        delete obj.methods;
    }
    if (obj.hasOwnProperty('data')) {
        const data = obj.data()
        Object.assign(window.VueData, data);
        delete obj.data;
    }
    Object.assign(window.VueKwargs, obj);
}