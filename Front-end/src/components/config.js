// config.js
import { createChatBotMessage } from 'react-chatbot-kit';

const botName = "ChatBot";

const config = {
    initialMessages: [createChatBotMessage(`Xin chào! Tôi là ${botName}. Bạn cần hỗ trợ gì?`)],
    botName: botName,
    customStyles: {
        botMessageBox: {
            backgroundColor: "#376B7E",
        },
        chatButton: {
            backgroundColor: "#5ccc9d",
        },
    },
    // Thêm các cấu hình khác nếu cần
};

export default config;
