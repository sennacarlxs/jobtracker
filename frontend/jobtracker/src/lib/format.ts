function getInitials(name: string): string {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word.charAt(0).toUpperCase())
        .join("");
}

function formatRelativeDate(iso: string): string {
    const diffDays = Math.floor((Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return "Hoje";
    if (diffDays === 1) return "Ontem";
    return `Há ${diffDays} dias`;
}

const AVATAR_COLORS = [
    "bg-blue-500",
    "bg-orange-500",
    "bg-teal-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-emerald-500",
];

function getAvatarColor(seed: string): string {
    let hash = 0;
    for (const char of seed) hash = (hash * 31 + char.charCodeAt(0)) | 0;
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export { getInitials, formatRelativeDate, getAvatarColor };
