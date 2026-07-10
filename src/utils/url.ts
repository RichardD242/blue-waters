const URL_PATTERN = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/;

export function looksLikeUrl(value: string): boolean {
    const trimmed = value.trim();
    if (!trimmed || trimmed.includes(" ")) {
        return false;
    }
    return URL_PATTERN.test(trimmed);
}

export function normalizeUrl(value: string): string {
    const trimmed = value.trim();
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export function hostnameOf(value: string): string {
    try {
        return new URL(normalizeUrl(value)).hostname.replace(/^www\./, "");
    } catch {
        return value;
    }
}