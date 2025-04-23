const request = async (
    method: "GET" | "POST" | "PUT" | "DELETE",
    url: string,
    body?: unknown,
    headers: Record<string, string> = {},
    signal?: AbortSignal
): Promise<unknown> => {
    try {
        const token = localStorage.getItem("token");
        const options: RequestInit = {
            method,
            headers: {
                ...headers,
                ...(token ? { "Authorization": `Bearer ${token}` } : {}),
            },
            signal
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
        const responseData = await response.text();
        
        console.log("Status da resposta:", response.status);
        console.log("Resposta bruta:", responseData);

        if (!response.ok) {
            let errorMessage;
            try {
                const errorData = JSON.parse(responseData);
                errorMessage = errorData.message || `Erro ${response.status}: ${response.statusText}`;
            } catch {
                errorMessage = `Erro ${response.status}: ${response.statusText}`;
            }
            throw new Error(errorMessage);
        }

        if (!responseData) {
            return null;
        }

        try {
            return JSON.parse(responseData);
        } catch {
            return responseData;
        }
    } catch (error) {
        console.error("Erro detalhado na requisição:", error);
        throw error;
    }
};

export default request;