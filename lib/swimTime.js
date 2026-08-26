export function parseCssTimeToSeconds(cssTimeStr) {
    if (typeof cssTimeStr !== 'string') {
        return null;
    }
    const parts = cssTimeStr.split(':');
    if (parts.length === 2) {
        const minutes = parseInt(parts[0], 10);
        const seconds = parseFloat(parts[1]);
        if (isNaN(minutes) || isNaN(seconds)) {
            return null;
        }
        return minutes * 60 + seconds;
    }
    return null;
}

export function formatSecondsToMmSs(totalSeconds) {
    const rounded = Math.ceil(totalSeconds);
    const minutes = Math.floor(rounded / 60);
    const seconds = rounded % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
