import {useEffect} from "react";

export function UseBackButtonRedirect(url) {
    useEffect(() => {
        const handlePopState = () => {
            window.location.href = url;
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [url]);
}
