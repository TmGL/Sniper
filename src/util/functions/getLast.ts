export default function getLast(arr: [], amount: number) : undefined | never[] {
    if (!arr) return undefined;
    
    return arr.slice(Math.max(arr.length - amount, 0));
}