import { jsonEval } from "@firebase/util";
import { useState, useEffect } from "react";
import { fetchedData } from "../../../customTypes/customTypes";

const useGet = (url: string, token?: string): fetchedData => {
    const [data, setData] = useState({data: null, error: null, loading: true} as fetchedData)

    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? token : '',
            },
            mode: 'cors',
        })
        .then((res) => res.json())
        .then((jsonData) => setData({...data, data: jsonData, loading: false}))
        .catch((err) => setData({...data, error: err, loading: false}))
    }, [])

    return data
}

export { useGet }

