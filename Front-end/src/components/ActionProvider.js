// ActionProvider.js
class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
        this.createClientMessage = createClientMessage;
    }

    // Hàm để gửi tin nhắn chào mừng
    greet() {
        const greetingMessage = this.createChatBotMessage("Chào bạn! Tôi có thể giúp gì cho bạn hôm nay?");
        this.setState((prev) => ({
            ...prev,
            messages: [...prev.messages, greetingMessage],
        }));
    }

    // Thêm các hành động khác mà chatbot có thể thực hiện
}

export default ActionProvider;
