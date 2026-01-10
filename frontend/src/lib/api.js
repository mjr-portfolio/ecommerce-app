const API = import.meta.env.VITE_API_URL

export async function api(
    path,
    { method = 'GET', body = null, auth = false } = {}
) {
    const headers = { 'Content-Type': 'application/json' }

    if (auth) {
        const token = localStorage.getItem('accessToken')
        if (token) {
            headers.Authorization = `Bearer ${token}`
        }
    }

    const res = await fetch(`${API}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
    })

    const data = await res.json().catch(() => null)

    if (!res.ok) {
        throw new Error(data?.error || 'Request failed')
    }

    return data
}
