const development: boolean = !import.meta.env || import.meta.env.DEV;

export default function isDev(): boolean {
    return development;
}
