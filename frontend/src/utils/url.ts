export function joinUrl(...parts: string[]): string {
    // Remove trailing slashes from parts and join them with a '/'
    const joined = parts.map(part => part.replace(/\/$/, '')).join('/');

    // Remove consecutive slashes and add a single slash between parts
    const normalized = joined.replace(/([^:]\/)\/+/g, '$1');

    // Handle special case: if the first part starts with "http://" or "https://", keep it intact
    if (parts[0].startsWith('http://') || parts[0].startsWith('https://')) {
        return parts[0] + normalized.substring(parts[0].length);
    }

    return normalized;
}