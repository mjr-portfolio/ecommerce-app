const API = import.meta.env.VITE_API_URL

export async function api(
    path,
    { method = 'GET', body = null, auth = false, credentials } = {}
) {
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
    }

    if (body) {
        options.body = JSON.stringify(body)
    }

    // If this is an authenticated route, always send cookies
    if (auth) {
        options.credentials = 'include'
    }
    // Otherwise, honour whatever was passed in manually
    if (credentials) {
        options.credentials = credentials // e.g. 'include', 'omit'
    }

    const res = await fetch(`${API}${path}`, options)

    let data
    try {
        data = await res.json()
    } catch {
        data = null
    }

    if (!res.ok) {
        throw new Error(data?.error || 'Request failed')
    }

    return data
}
