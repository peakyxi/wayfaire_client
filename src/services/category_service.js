import http from './http_service'
const apiUrl = process.env.REACT_APP_API_URL

function getAllCategories() {
    return http.get(`${apiUrl}/categories`)
        .then(({ data }) => data)
        .catch(err => console.log(err))
}
function getCategoriesByParentId(parentId) {
    return http.get(`${apiUrl}/categories/parent/${parentId}`)
        .then(({ data }) => data)
        .catch(err => console.log(err))
}
function fireScrapingByCategory() {
    return http.post(`${apiUrl}/categories/scraping`, null)
        .then(({ data }) => data)
        .catch(err => console.log(err))
}

function resetScrapingStatus() {
    return http.post(`${apiUrl}/categories/scraping/reset`, null)
        .then(({ data }) => data)
        .catch(err => console.log(err))
}
function getScrapingStatus() {
    return http.get(`${apiUrl}/categories/scraping/status`, null)
        .then(({ data }) => data)
        .catch(err => console.log(err))
}




export { getAllCategories, getCategoriesByParentId, fireScrapingByCategory, resetScrapingStatus, getScrapingStatus }



