import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { sendMessageToAI } from "../services/ChatService";

describe("sendMessageToAI", () => {
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    const testCases = [
        {
            description: "should return the AI response when the API call is successful",
            message: "Hello",
            history: [{ role: "user", text: "Hi" }],
            mockResponse: { response: "Hello, how can I help you?" },
            mockStatus: 200,
            expected: "Hello, how can I help you?",
            shouldThrow: false,
        },
        {
            description: "should throw an error when the API call fails",
            message: "Hello",
            history: [{ role: "user", text: "Hi" }],
            mockResponse: null,
            mockStatus: 500,
            expected: "Failed to communicate with the AI.",
            shouldThrow: true,
        },
        {
            description: "should handle empty message",
            message: "",
            history: [{ role: "user", text: "Hi" }],
            mockResponse: { response: "Please provide a message." },
            mockStatus: 200,
            expected: "Please provide a message.",
            shouldThrow: false,
        },
        {
            description: "should handle empty history",
            message: "Hello",
            history: [],
            mockResponse: { response: "Hello, how can I help you?" },
            mockStatus: 200,
            expected: "Hello, how can I help you?",
            shouldThrow: false,
        },
        {
            description: "should handle network error",
            message: "Hello",
            history: [{ role: "user", text: "Hi" }],
            mockResponse: null,
            mockStatus: null,
            expected: "Failed to communicate with the AI.",
            shouldThrow: true,
        },
    ];

    testCases.forEach(({ description, message, history, mockResponse, mockStatus, expected, shouldThrow }) => {
        it(description, async () => {
            if (mockStatus !== null) {
                mock.onPost("http://localhost:3001/chat").reply(mockStatus, mockResponse);
            } else {
                mock.onPost("http://localhost:3001/chat").networkError();
            }

            if (shouldThrow) {
                await expect(sendMessageToAI(message, history)).rejects.toThrow(expected);
            } else {
                const result = await sendMessageToAI(message, history);
                expect(result).toBe(expected);
            }
        });
    });
});