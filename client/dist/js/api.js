// API utilities
export const API_BASE = '/api';

export async function submitInquiry(data) {
    const response = await fetch(`${API_BASE}/inquiries`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Failed to submit inquiry');
    }

    return await response.json();
}
