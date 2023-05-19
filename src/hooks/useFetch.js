import { useState, useEffect } from 'react'

export const useFetch = (url) => {

    const [data, setData] = useState(null)
    const [config, setConfig] = useState(null)
    const [method, setMethod] = useState(null)
    const [callFetch, setCallFetch] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [itemId, setItemId] = useState(null)

    const httpConfig = async (data, method) => {
        if(method === "POST"){
           setConfig({
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
           })

           setMethod(method)
        } else if( method === "DELETE"){
            setConfig({
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json"
                },
               })
               setMethod("DELETE")
               setItemId(data)
        }
    }
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await fetch(url);
                const json = await res.json();
                setData(json)
            }catch(error){
                setError("Houve um Erro ao carregar dados!")
            }
            setLoading(false)
        }
        fetchData();
    }, [url, callFetch])

    useEffect(() => {
        const httpRequest = async () => {
            let json;
            if(method === "POST"){
                let fetchOptions = [url, config]
                const res = await fetch(...fetchOptions)
                json = await res.json();
                setCallFetch(json)
            } else if(method === "DELETE"){
                const deleteUrl = `${url}/${itemId}`
                const res = await fetch(deleteUrl, config)
                json = await res.json();
            } 
        }
        httpRequest();
    }, [config, method, url, itemId])

    return { data, httpConfig, loading, error };
}


