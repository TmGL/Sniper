export default function capitalise(input: string) : string {
    if (typeof input === 'string' && input.length > 0) {
        return input.charAt(0).toUpperCase() + input.slice(1);
    }

    throw new Error('input should be a non-emty string');
}