import { API_URL } from "@/config/api";

const request = async (
    method: "GET" | "POST" | "PUT" | "DELETE",
    url: string,
    body?: any,
    headers: Record<string, string> = {} 
): Promise<any> => {
    try {
        const options: RequestInit = {
            method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                ...headers,
            },
            credentials: "include",
        };

        if (body instanceof FormData) {
            options.body = body;
            delete options.headers["Content-Type"]; // Remove Content-Type for FormData
        } else if (body) {
            options.body = JSON.stringify(body);
        }

        console.log(`Fazendo requisição ${method} para ${url}`);
        console.log("Opções da requisição:", options);

        const response = await fetch(url, options);

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Erro na resposta:", {
                status: response.status,
                statusText: response.statusText,
                errorText
            });
            throw new Error(`Falha na requisição: ${response.status} ${response.statusText}`);
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        } else {
            return await response.text();
        }
    } catch (error) {
        console.error("Erro detalhado ao fazer a requisição:", error);
        if (error instanceof TypeError && error.message === "Failed to fetch") {
            throw new Error(`Não foi possível conectar ao servidor. Verifique se o servidor está rodando em ${API_URL}`);
        }
        throw error;
    }
};

export default request;
