import { RetrievedChunk } from "@/types/chat";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

let isFirstRequest = true;

export interface ChatApiResponse {
  answer: string;
  retrieved: RetrievedChunk[];
}

export interface ChatApiError {
  message: string;
  code: "NETWORK" | "SERVER" | "TIMEOUT" | "UNKNOWN" | "RATE_LIMIT";
  limitType?: "per_minute" | "per_day" | "global";
  retryAfter?: string;
}
// ✅ Callbacks for streaming
export interface StreamCallbacks {
  onSources?: (sources: RetrievedChunk[]) => void;
  onToken?: (token: string) => void;
  onDone?: (fullResponse: string, sources: RetrievedChunk[]) => void;
  onError?: (error: ChatApiError) => void;
  onSlowResponse?: () => void;
}

/**
 * ✅ NEW: Streaming version using SSE
 */
export async function sendChatMessageStream(
  message: string,
  callbacks: StreamCallbacks
): Promise<void> {
  let fullResponse = "";
  let sources: RetrievedChunk[] = [];
  let slowResponseTimeout: NodeJS.Timeout | undefined;

  try {
    // Wake-up detection for first request
    if (isFirstRequest && callbacks.onSlowResponse) {
      slowResponseTimeout = setTimeout(() => {
        callbacks.onSlowResponse?.();
      }, 3000);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    const response = await fetch(`${API_URL}/chat/stream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    if (slowResponseTimeout) clearTimeout(slowResponseTimeout);
    isFirstRequest = false;

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      // ✅ Handle rate limit (429)
      if (response.status === 429) {
        const detail = errorData.detail || {};
        throw {
          message: detail.message || "Too many requests. Please slow down!",
          code: "RATE_LIMIT",
          limitType: detail.limit_type,
          retryAfter: detail.retry_after,
        } as ChatApiError;
      }

      throw {
        message: errorData.detail?.message || errorData.detail || `Server error: ${response.status}`,
        code: "SERVER",
      } as ChatApiError;
    }

    if (!response.body) {
      throw {
        message: "No response body",
        code: "UNKNOWN",
      } as ChatApiError;
    }

    // ✅ Read the stream
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // Decode chunk
      buffer += decoder.decode(value, { stream: true });

      // Process complete SSE messages (separated by \n\n)
      const lines = buffer.split("\n\n");
      buffer = lines.pop() || ""; // Keep incomplete line in buffer

      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;

        try {
          const jsonStr = line.slice(6); // Remove "data: " prefix
          const event = JSON.parse(jsonStr);

          if (event.type === "sources") {
            sources = event.data;
            callbacks.onSources?.(sources);
          } else if (event.type === "token") {
            fullResponse += event.data;
            callbacks.onToken?.(event.data);
          } else if (event.type === "done") {
            callbacks.onDone?.(fullResponse, sources);
            return;
          }
        } catch (e) {
          console.error("Error parsing SSE:", e);
        }
      }
    }

    // Stream ended without "done" event
    callbacks.onDone?.(fullResponse, sources);
  } catch (error: any) {
    if (slowResponseTimeout) clearTimeout(slowResponseTimeout);

    let errorObj: ChatApiError;

    if (error.name === "AbortError") {
      errorObj = {
        message: "Request timed out. Please try again.",
        code: "TIMEOUT",
      };
    } else if (error.code) {
      errorObj = error;
    } else if (error.message?.includes("fetch")) {
      errorObj = {
        message: "Cannot connect to backend. Is the server running?",
        code: "NETWORK",
      };
    } else {
      errorObj = {
        message: error.message || "Something went wrong",
        code: "UNKNOWN",
      };
    }

    callbacks.onError?.(errorObj);
  }
}

// Keep old non-streaming version for fallback
export async function sendChatMessage(
  message: string,
  onSlowResponse?: () => void
): Promise<ChatApiResponse> {
  try {
    let slowResponseTimeout: NodeJS.Timeout | undefined;
    if (isFirstRequest && onSlowResponse) {
      slowResponseTimeout = setTimeout(() => {
        onSlowResponse();
      }, 3000);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    const response = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    if (slowResponseTimeout) clearTimeout(slowResponseTimeout);
    isFirstRequest = false;

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      // ✅ Handle rate limit (429)
      if (response.status === 429) {
        const detail = errorData.detail || {};
        throw {
          message: detail.message || "Too many requests. Please slow down!",
          code: "RATE_LIMIT",
          limitType: detail.limit_type,
          retryAfter: detail.retry_after,
        } as ChatApiError;
      }

      throw {
        message: errorData.detail?.message || errorData.detail || `Server error: ${response.status}`,
        code: "SERVER",
      } as ChatApiError;
    }

    const data = await response.json();
    return {
      answer: data.answer,
      retrieved: data.retrieved || [],
    };
  } catch (error: any) {
    if (error.name === "AbortError") {
      throw {
        message: "Request timed out. Please try again.",
        code: "TIMEOUT",
      } as ChatApiError;
    }
    if (error.code) throw error;
    if (error.message?.includes("fetch")) {
      throw {
        message: "Cannot connect to backend.",
        code: "NETWORK",
      } as ChatApiError;
    }
    throw {
      message: error.message || "Something went wrong",
      code: "UNKNOWN",
    } as ChatApiError;
  }
}

export async function checkBackendHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/health`, {
      method: "GET",
      signal: AbortSignal.timeout(5000),
    });
    return response.ok;
  } catch {
    return false;
  }
}