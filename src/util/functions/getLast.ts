export default function getLast(arr: Array<any>, amount: number) {
    if (!arr) return undefined;
    
    return arr.slice(Math.max(arr.length - amount, 0));
}