import { sendMessageToAI } from '../services/geminiService';
import { chatSession } from '../services/geminiModel';

jest.mock('../services/geminiModel');

const testCases = [
    {
        description: 'should send a message to the AI and return the response',
        mockStream: {
            async *[Symbol.asyncIterator]() {
                yield { text: () => 'Hello, this is AI!' };
            },
        },
        expectedResponse: 'Hello, this is AI!',
        userMessage: 'Hi',
        history: [],
        expectedHistory: [
            { role: 'user', parts: [{ text: 'Hi' }] },
            { role: 'model', parts: [{ text: 'Hello, this is AI!' }] },
        ],
        shouldThrow: false,
    },
    {
        description: 'should throw an error if the AI service fails',
        mockStream: null,
        expectedResponse: null,
        userMessage: 'Hi',
        history: [],
        expectedHistory: [],
        shouldThrow: true,
    },
];

describe('sendMessageToAI', () => {
    testCases.forEach(({ description, mockStream, expectedResponse, userMessage, history, expectedHistory, shouldThrow }) => {
        it(description, async () => {
            if (shouldThrow) {
                (chatSession.sendMessageStream as jest.Mock).mockRejectedValue(new Error('Test error'));
                await expect(sendMessageToAI(userMessage)).rejects.toThrow('Failed to get a response from the AI.');
            } else {
                (chatSession.sendMessageStream as jest.Mock).mockResolvedValue({ stream: mockStream });
                chatSession.params = { history };

                const response = await sendMessageToAI(userMessage);
                expect(response).toBe(expectedResponse);
                expect(chatSession.params.history).toEqual(expectedHistory);
            }
        });
    });
});