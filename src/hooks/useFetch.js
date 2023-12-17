import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
export function useFetch(url, options) {
    const [data, setData] = useState(null);
    const [error, setError] = useState({ code: "", msg: "" });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchData() {
            try {
                const result = await axios.get(url, options);
                setData(result.data);
            } catch (err) {
                setError({ ...error, code: err.code, msg: err.message });
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [url]);

    return { data, error, loading };
}
