export function capitalise(input: string): string {
    if (typeof input === 'string' && input.length > 0) {
        return input.charAt(0).toUpperCase() + input.slice(1);
    }

    throw new Error('input should be a non-emty string');
}

export function getLast(arr: string[], amount: number): undefined | string[] {
    if (!arr) return undefined;

    return arr.slice(Math.max(arr.length - amount, 0));
}

export function id() {
    return Math.random().toString(36).substr(4, 11);
}