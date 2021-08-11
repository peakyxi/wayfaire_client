import http from './http_service'
const apiUrl = process.env.REACT_APP_API_URL


function getAllProcesses() {
    return http.get(`${apiUrl}/processes`)
        .then(({ data }) => data)
        .catch(err => console.log(err))
}

function stopProcess(cid) {
    return http.post(`${apiUrl}/processes/stop`, { cid }, { json: true })
        .then(({ data }) => data)
        .catch(err => console.log(err))

}

function deleteProcess(cid) {
    return http.post(`${apiUrl}/processes/delete`, { cid }, { json: true })
        .then(({ data }) => data)
        .catch(err => console.log(err))
}

function getProcessesByIds(ids) {
    return http.get(`${apiUrl}/processes?ids=${ids.join(',')}`)
        .then(({ data }) => data)
        .catch(err => console.log(err))
}


function fireProductScraping(cateId) {
    return http.post(`${apiUrl}/processes/scraping`, { cid: cateId }, { json: true })
        .then(({ data }) => data)
}

function downloadProductsByCateId(cateId) {
    return http.post(`${apiUrl}/processes/download`, { cid: cateId }, { json: true })
        .then(({ data }) => data)
}



export { getAllProcesses, stopProcess, deleteProcess, getProcessesByIds, fireProductScraping, downloadProductsByCateId }