// use this import for url
// import { uri, options } from '{{site.baseurl}}/assets/js/api/config.js';

export var uri;
if (location.hostname === "localhost") {
        uri = "https://well.stu.nighthawkcodingsociety.com/";
} else if (location.hostname === "127.0.0.1") {
        uri = "https://well.stu.nighthawkcodingsociety.com/";
} else {
        uri = "https://well.stu.nighthawkcodingsociety.com/";
}

export const options = {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'include', // include, same-origin, omit
    headers: {
        'Content-Type': 'application/json',
    },
};