const request = async (
    method: "GET" | "POST" | "PUT" | "DELETE",
    url: string,
    body?: unknown,
    headers: Record<string, string> = {} 
): Promise<unknown> => {
    try {
        const token = localStorage.getItem("token");
        const options: RequestInit = {
            method,
            headers: {
                ...headers,
                ...(token ? { "Authorization": `Bearer ${token}` } : {}),
            },
            mode: 'cors'
        };

        if (body instanceof FormData) {
            options.body = body;
        } else if (body) {
            options.headers = {
                "Content-Type": "application/json",
                ...(token ? { "Authorization": `Bearer ${token}` } : {}),
                ...headers,
            };
            options.body = JSON.stringify(body);
        }

        console.log("Fazendo requisição para:", url);
        console.log("Opções da requisição:", {
            method: options.method,
            headers: options.headers,
            body: options.body
        });

        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        }
        
        return await response.text();
    } catch (error) {
        console.error("Erro detalhado na requisição:", error);
        throw error;
    }
};

export default request;