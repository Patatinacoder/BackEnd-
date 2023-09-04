import Message from "./models/messagesModel.js";
class MessagesService {
  // Método para obtener todos los mensajes
  static async getMessages() {
    try {
      const messages = await Message.find();
      return messages;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Método para agregar un nuevo mensaje
  static async addMessage(user, message) {
    try {
      const newMessage = new Message({
        user,
        message
      });
      await newMessage.save();
      return newMessage;
    } catch (error) {
      throw new Error(error.message);
    }
  }

}

export default MessagesService;
