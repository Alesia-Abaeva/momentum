const apiCall = async (url, body, method = 'GET') => {
    const response = await fetch(url, {body, method})
    const data = await response.json()

    return data
}