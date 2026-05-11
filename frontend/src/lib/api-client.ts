const DEFAULT_API_BASE = "http://127.0.0.1:8080/api";
const API_BASE = (import.meta.env.VITE_API_BASE || DEFAULT_API_BASE).replace(
  /\/+$/,
  "",
);

function toApiUrl(endpoint: string): string {
  return `${API_BASE}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
}

type RequestOptions = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
};

async function request<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { method = "GET", body, headers = {} } = options;

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      "Client-Type": headers["X-Client-Type"] || "CUSTOMER",
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  let response: Response;
  try {
    response = await fetch(toApiUrl(endpoint), config);
  } catch {
    throw new Error(
      `Cannot connect to API at ${API_BASE}. Make sure backend is running.`,
    );
  }

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: response.statusText }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

export const apiClient = {
  get: <T>(endpoint: string, headers?: Record<string, string>) =>
    request<T>(endpoint, { headers }),

  post: <T>(
    endpoint: string,
    body: unknown,
    headers?: Record<string, string>,
  ) => request<T>(endpoint, { method: "POST", body, headers }),

  put: <T>(endpoint: string, body: unknown, headers?: Record<string, string>) =>
    request<T>(endpoint, { method: "PUT", body, headers }),

  delete: <T>(endpoint: string, headers?: Record<string, string>) =>
    request<T>(endpoint, { method: "DELETE", headers }),

  upload: async <T>(
    endpoint: string,
    formData: FormData,
    headers?: Record<string, string>,
  ): Promise<T> => {
    let response: Response;
    try {
      response = await fetch(toApiUrl(endpoint), {
        method: "POST",
        body: formData,
        headers,
      });
    } catch {
      throw new Error(
        `Cannot connect to API at ${API_BASE}. Make sure backend is running.`,
      );
    }
    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: response.statusText }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }
    return response.json();
  },

  download: async (
    endpoint: string,
    filename = "file.pdf",
    headers?: Record<string, string>,
  ) => {
    let response: Response;
    try {
      response = await fetch(toApiUrl(endpoint), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Client-Type": "CUSTOMER",
          ...headers,
        },
      });
    } catch {
      throw new Error(
        `Cannot connect to API at ${API_BASE}. Make sure backend is running.`,
      );
    }

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: response.statusText }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
  },
};
