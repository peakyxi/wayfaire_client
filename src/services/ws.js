import SockJS from 'sockjs-client'
const apiEndPoint = process.env['REACT_APP_API_URL']


function initSockjs(callback) {
    const sock = new SockJS(`${apiEndPoint}/update`);
    let timerId = 0
    sock.onopen = function () {
        console.log('open')
        clearTimeout(timerId)
    };
    sock.onmessage = function (e) {
        callback(e.data)
    };
    sock.onclose = function () {
        console.log('close')
        timerId = setTimeout(() => {
            console.log('restart')
            initSockjs(callback)
        }, 5000)
    };
}


export { initSockjs }