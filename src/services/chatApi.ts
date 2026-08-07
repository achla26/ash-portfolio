import { RetrievedChunk } from "@/types/chat";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// ✅ Track if this is the first request (for wake-up handling)
let isFirstRequest = true;

export interface ChatApiResponse {
  answer: string;
  retrieved: RetrievedChunk[];
}

export interface ChatApiError {
  message: string;
  code: "NETWORK" | "SERVER" | "TIMEOUT" | "UNKNOWN";
}

export async function sendChatMessage(
  message: string,
  onSlowResponse?: () => void  // ✅ Callback for slow response
): Promise<ChatApiResponse> {
  try {
    // ✅ If first request, warn user after 3 seconds
    let slowResponseTimeout: NodeJS.Timeout | undefined;
    if (isFirstRequest && onSlowResponse) {
      slowResponseTimeout = setTimeout(() => {
        onSlowResponse();
      }, 3000);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s for first load

    const response = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    if (slowResponseTimeout) clearTimeout(slowResponseTimeout);
    isFirstRequest = false; // ✅ Mark as no longer first

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw {
        message: errorData.detail || `Server error: ${response.status}`,
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

    if (error.code) {
      throw error;
    }

    if (error.message?.includes("fetch")) {
      throw {
        message: "Cannot connect to backend. Is the server running?",
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