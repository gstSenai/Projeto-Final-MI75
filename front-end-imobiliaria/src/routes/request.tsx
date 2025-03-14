const request = async (
    method: "GET" | "POST" | "PUT" | "DELETE",
    url: string,
    body?: any
): Promise<any> => {
    try {
        const options: RequestInit = {
            method,
            headers: {
                "Content-Type": "application/json",
            },
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Falha na requisição: ${response.status} ${response.statusText}`);
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        } else {
            return await response.text();
        }
    } catch (error) {
        console.error("Erro ao fazer a requisição:", error);
        throw error;
    }
};

export default request;
