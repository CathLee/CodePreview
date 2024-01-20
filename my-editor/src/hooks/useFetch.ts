import { useEffect,useState } from "react";

export const useFetch = (url: string) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(url);
                if (!res.ok) {
                    throw Error('could not fetch the data for that resource');
                } else {
                    const data = await res.json();
                    setData(data);
                    setError(null);
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }

        }
        fetchData()
    }, [url])
    return { data, error, loading }
}