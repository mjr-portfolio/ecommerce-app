const API = import.meta.env.VITE_API_URL

// Standard request wrapper
export async function api(
    path,
    { method = 'GET', body = null, auth = false } = {}
) {
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
    }

    // Only attach body if present
    if (body) options.body = JSON.stringify(body)

    // Attach cookies automatically for authenticated routes
    if (auth) options.credentials = 'include'

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
