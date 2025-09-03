import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types
export interface ChatRequest {
  message: string;
  user_role: "customer_service" | "supervisor" | "manager" | "admin";
  user_id: string;
}

export interface Ticket {
  id: string;
  title: string;
  priority: "P1" | "P2" | "P3" | "P4";
  category: string;
  team: string;
  status: string;
  complaint_id: string;
}

export interface ChatResponse {
  agent_name: "TelecomMaster";
  response: string;
  tickets_created: Ticket[];
  processing_complete: boolean;
}

// Mock data for development
const mockResponse: ChatResponse = {
  agent_name: "TelecomMaster",
  response: "Processed latest SharePoint complaints and created prioritized Jira tickets. I've analyzed 12 customer complaints and successfully created 3 high-priority tickets for immediate attention.",
  tickets_created: [
    {
      id: "TELECOM-001",
      title: "Network Outage - Downtown Area",
      priority: "P1",
      category: "Network",
      team: "Network Operations",
      status: "Open",
      complaint_id: "SP-44321"
    },
    {
      id: "TELECOM-002",
      title: "Billing Discrepancy for Postpaid Plan",
      priority: "P3",
      category: "Billing",
      team: "Finance Support", 
      status: "Open",
      complaint_id: "SP-44359"
    },
    {
      id: "TELECOM-003",
      title: "Service Speed Below Contract Terms",
      priority: "P2",
      category: "Performance",
      team: "Technical Support",
      status: "In Progress",
      complaint_id: "SP-44387"
    }
  ],
  processing_complete: true
};

export const chatAPI = {
  sendMessage: async (request: ChatRequest): Promise<ChatResponse> => {
    // Check if using mock mode
    if (import.meta.env.VITE_USE_MOCK === 'true') {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      return mockResponse;
    }

    try {
      const response = await api.post<ChatResponse>('/api/v1/chat', request);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Failed to process request. Please try again.');
    }
  }
};