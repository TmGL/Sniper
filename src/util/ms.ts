interface Options {
    long?: boolean;
}

const s = 1000;
const m = s * 60;
const h = m * 60;
const d = h * 24;
const w = d * 7;
const y = d * 365.25;

function ms(val: string, options?: Options) : number;
function ms(val: number, options?: Options) : string;
function ms(val: string | number, options?: Options) : string | number | undefined {
    if (typeof val === 'string' && val.length > 0) {
        return parse(val);
    } else if (typeof val === 'number' && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
    }

    throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
}

function parse(str: string): number | undefined {
    if (str.length > 100) return;
    const match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
    if (!match) return;

    const n = parseFloat(match[1]);
    const type = (match[2] || 'ms').toLowerCase();
    switch (type) {
        case 'years':
        case 'year':
        case 'yrs':
        case 'yr':
        case 'y':
            return n * y;

        case 'weeks':
        case 'week':
        case 'w':
            return n * w;

        case 'days':
        case 'day':
        case 'd':
            return n * d;

        case 'hours':
        case 'hour':
        case 'hrs':
        case 'hr':
        case 'h':
            return n * h;

        case 'minutes':
        case 'minute':
        case 'mins':
        case 'min':
        case 'm':
            return n * m;

        case 'seconds':
        case 'second':
        case 'secs':
        case 'sec':
        case 's':
            return n * s;

        case 'milliseconds':
        case 'millisecond':
        case 'msecs':
        case 'msec':
        case 'ms':
            return n;

        default:
            return undefined;
    }
}

function fmtShort(ms: number): string {
    const msAbs = Math.abs(ms);
    
    if (msAbs >= d) {
        return Math.round(ms / d) + 'd';
    }
    if (msAbs >= h) {
        return Math.round(ms / h) + 'h';
    }
    if (msAbs >= m) {
        return Math.round(ms / m) + 'm';
    }
    if (msAbs >= s) {
        return Math.round(ms / s) + 's';
    }

    return ms + 'ms';
}

function fmtLong(ms: number): string {
    const msAbs = Math.abs(ms);

    if (msAbs >= d) {
        return plural(ms, msAbs, d, 'day');
    }
    if (msAbs >= h) {
        return plural(ms, msAbs, h, 'hour');
    }
    if (msAbs >= m) {
        return plural(ms, msAbs, m, 'minute');
    }
    if (msAbs >= s) {
        return plural(ms, msAbs, s, 'second');
    }

    return ms + ' ms';
}

function plural(ms: number, msAbs: number, n: number, name: string): string {
    const isPlural = msAbs >= n * 1.5;

    return `${Math.round(ms / n)} ${name} ${isPlural ? 's' : ''}`;
}

export { ms };
export default ms;