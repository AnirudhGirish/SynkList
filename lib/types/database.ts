export type User = {
  id: string;
  email: string;
  name: string | null;
  role: "basic" | "premium";
  created_at: string;
  updated_at: string;
};

export type PlatformConnection = {
  id: string;
  user_id: string;
  platform_name: string;
  platform_user_id: string;
  access_tokens: {
    access_token: string;
    refresh_token?: string;
    expires_at?: number;
    token_type?: string;
    scope?: string;
  };
  is_active: boolean;
  last_sync: string | null;
  created_at: string;
  updated_at: string;
};

export type OAuthState = {
  state: string;
  user_id: string;
  created_at: string;
  expires_at: string;
};

export type Message = {
  id: string;
  platform_connection_id: string;
  user_id: string;
  external_id: string;
  sender: string;
  subject: string | null;
  content: string | null;
  priority: "low" | "normal" | "high" | "urgent";
  status: "unread" | "read" | "archived" | "starred";
  is_read: boolean;
  message_date: string;
  created_at: string;
  updated_at: string;
};

export type MessageLabel = {
  id: string;
  message_id: string;
  label_name: string;
  confidence_score: number | null;
  created_at: string;
};

// Gmail API types
export type GmailMessagePart = {
  mimeType: string;
  body?: { data?: string; size: number };
  parts?: GmailMessagePart[];
};

export type GmailMessage = {
  id: string;
  threadId: string;
  snippet: string;
  payload: {
    headers: Array<{ name: string; value: string }>;
    body?: { data?: string; size: number };
    parts?: GmailMessagePart[];
  };
  internalDate: string;
  labelIds: string[];
};

export type GmailListResponse = {
  messages: Array<{ id: string; threadId: string }>;
  nextPageToken?: string;
  resultSizeEstimate: number;
};
