export default function getLast(arr: string[], amount: number) : undefined | string[] {
    if (!arr) return undefined;
    
    return arr.slice(Math.max(arr.length - amount, 0));
}