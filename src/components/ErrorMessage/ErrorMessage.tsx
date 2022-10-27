
interface ErrorProps {
    error: string;
}

export default function ErrorMessage({ error }: ErrorProps){
    return <span className={"error"}>{error}</span>
}