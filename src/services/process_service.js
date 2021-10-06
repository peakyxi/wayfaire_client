import http from './http_service'
const apiUrl = process.env.REACT_APP_API_URL


function getAllProcesses() {
    return http.get(`${apiUrl}/processes`)
        .then(({ data }) => data)
        .catch(err => console.log(err))
}

function changeStatus(pid, status) {
    return http.put(`${apiUrl}/processes/${pid}`, { status }, { json: true })
        .then(({ data }) => data)
    // .catch(err => console.log(err))

}

function deleteProcess(pid) {
    return http.delete(`${apiUrl}/processes/${pid}`)
        .then(({ data }) => data)

}

function getProcessesByIds(ids) {
    return http.get(`${apiUrl}/processes?ids=${ids.join(',')}`)
        .then(({ data }) => data)
        .catch(err => console.log(err))
}


function fireProductScraping(cateId) {
    return http.post(`${apiUrl}/processes`, { cid: cateId }, { json: true })
        .then(({ data }) => data)
}

function downloadProductsByCateId(cateId) {
    return http.post(`${apiUrl}/processes/download`, { cid: cateId }, { json: true })
        .then(({ data }) => data)
}



export { getAllProcesses, changeStatus, deleteProcess, getProcessesByIds, fireProductScraping, downloadProductsByCateId }