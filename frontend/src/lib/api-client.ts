const DEFAULT_API_BASE = "http://127.0.0.1:8080/api";
const VITE_API_BASE =
  typeof import.meta !== "undefined" && import.meta.env
    ? import.meta.env.VITE_API_BASE
    : undefined;

const API_BASE = (VITE_API_BASE || DEFAULT_API_BASE).replace(
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

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 seconds timeout

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      "Client-Type": headers["X-Client-Type"] || "CUSTOMER",
      ...headers,
    },
    credentials: "include",
    signal: controller.signal,
  };

  // Only attach body if method is not GET or HEAD
  if (body && method !== "GET" && method !== "HEAD") {
    config.body = JSON.stringify(body);
  }

  console.log("TRANSACTION BEGINING");
  console.log("Body: ", body);

  let response: Response;
  try {
    response = await fetch(toApiUrl(endpoint), config);
  } catch (err: any) {
    if (err.name === "AbortError") {
      throw new Error(`Request timed out at ${API_BASE}. Please try again.`);
    }
    throw new Error(
      `Cannot connect to API at ${API_BASE}. Make sure backend is running.`,
    );
  } finally {
    clearTimeout(timeoutId);
  }

  // console.log("Response body: ", response.body);

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: response.statusText }));
    console.log(error.message || `HTTP ${response.status}`);
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return undefined as T;
  }

  // Safe parse empty body for successful responses (e.g. 200 OK with no content)
  const responseText = await response.text();

  if (!responseText) {
    return undefined as T;
  }

  const data = JSON.parse(responseText);

  // Auto sort array by first property (assume id-like field)
  if (
    Array.isArray(data) &&
    data.length > 0 &&
    typeof data[0] === "object" &&
    data[0] !== null
  ) {
    const firstKey = Object.keys(data[0])[0];

    data.sort((a, b) => {
      const av = a[firstKey];
      const bv = b[firstKey];

      // Number sort DESC
      if (typeof av === "number" && typeof bv === "number") {
        return bv - av;
      }

      // String sort DESC
      return String(bv).localeCompare(String(av));
    });
  }

  return data as T;
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
    const safeHeaders = headers || {};
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 seconds timeout

    let response: Response;
    try {
      response = await fetch(toApiUrl(endpoint), {
        method: "POST",
        body: formData,
        headers: {
          "Client-Type": safeHeaders["X-Client-Type"] || "CUSTOMER",
          ...safeHeaders,
        },
        credentials: "include",
        signal: controller.signal,
      });
    } catch (err: any) {
      if (err.name === "AbortError") {
        throw new Error(`Upload timed out at ${API_BASE}. Please try again.`);
      }
      throw new Error(
        `Cannot connect to API at ${API_BASE}. Make sure backend is running.`,
      );
    } finally {
      clearTimeout(timeoutId);
    }

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: response.statusText }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    // Safe parse empty body for successful uploads
    const responseText = await response.text();
    return responseText ? (JSON.parse(responseText) as T) : (undefined as T);
  },

  download: async (
    endpoint: string,
    filename = "file.pdf",
    headers?: Record<string, string>,
  ) => {
    const safeHeaders = headers || {};
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 seconds timeout

    let response: Response;
    try {
      response = await fetch(toApiUrl(endpoint), {
        method: "GET",
        headers: {
          "Client-Type": safeHeaders["X-Client-Type"] || "CUSTOMER",
          ...safeHeaders,
        },
        credentials: "include",
        signal: controller.signal,
      });
    } catch (err: any) {
      if (err.name === "AbortError") {
        throw new Error(`Download timed out at ${API_BASE}. Please try again.`);
      }
      throw new Error(
        `Cannot connect to API at ${API_BASE}. Make sure backend is running.`,
      );
    } finally {
      clearTimeout(timeoutId);
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

  downloadPost: async <T = any>(
    endpoint: string,
    body: T,
    filename = "file.pdf",
    headers?: Record<string, string>,
  ) => {
    const safeHeaders = headers || {};
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    let response: Response;
    try {
      response = await fetch(toApiUrl(endpoint), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Client-Type": safeHeaders["X-Client-Type"] || "CUSTOMER",
          ...safeHeaders,
        },
        credentials: "include",
        body: JSON.stringify(body),
        signal: controller.signal,
      });
    } catch (err: any) {
      if (err.name === "AbortError") {
        throw new Error(`Download timed out at ${API_BASE}. Please try again.`);
      }
      throw new Error(
        `Cannot connect to API at ${API_BASE}. Make sure backend is running.`,
      );
    } finally {
      clearTimeout(timeoutId);
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
