// MessageParser.js
class MessageParser {
    constructor(actionProvider) {
        this.actionProvider = actionProvider;
    }

    parse(message) {
        const lowerCaseMessage = message.toLowerCase();

        if (lowerCaseMessage.includes("chào")) {
            this.actionProvider.greet();
        }

        // Thêm các quy tắc phân tích cú pháp khác tại đây
    }
}

export default MessageParser;
