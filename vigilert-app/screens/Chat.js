import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Bottombar from '../layout/Bottombar';

const ChatScreen = ({ navigation }) => {
  const [userMessages, setUserMessages] = useState([]);
  const [chatbotMessages, setChatbotMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [predefinedAnswers, setPredefinedAnswers] = useState([]);

  useEffect(() => {
    // Load predefined answers from your data source
    const answers = [
      'Yes',
      'No',
      'Medical assistance',
      'Fire department',
      'Police',
      'Theft',
      'Suspected activity',
      'Other',
    ];
    setPredefinedAnswers(answers);
  }, []);

  const handleSendMessage = (message) => {
    const userMessage = { text: message, sender: 'user' };
    setUserMessages([...userMessages, userMessage]);

    // Simulate chatbot responses after user's messages
    simulateChatbotResponses(message);
  };

  const simulateChatbotResponses = (userMessage) => {
    // Simulate a brief delay for the chatbot response
    setTimeout(() => {
      const chatbotResponse = { text: '', sender: 'chatbot' };
      let isValidAnswer = false;

      switch (userMessage.toLowerCase()) {
        case 'emergency':
          chatbotResponse.text = 'Is this an immediate life-threatening situation?';
          isValidAnswer = true;
          break;
        case 'yes':
          chatbotResponse.text = 'Please provide your current location (address or coordinates).';
          isValidAnswer = true;
          break;
        case 'no':
          chatbotResponse.text = 'What type of assistance do you need?';
          isValidAnswer = true;
          break;
        case 'theft':
          chatbotResponse.text = 'Please describe the suspect and the location.';
          isValidAnswer = true;
          break;
        case 'suspected activity':
          chatbotResponse.text = 'Can you provide more details about the activity?';
          isValidAnswer = true;
          break;
        case 'medical assistance':
          chatbotResponse.text = 'Is it a medical emergency? (yes/no)';
          isValidAnswer = true;
          break;
        case 'fire department':
          chatbotResponse.text = 'Please describe the fire situation.';
          isValidAnswer = true;
          break;
        case 'police':
          chatbotResponse.text = 'Can you provide more details about the police assistance needed?';
          isValidAnswer = true;
          break;
        case 'yes':
          chatbotResponse.text = 'Please call 911 immediately.';
          isValidAnswer = true;
          break;
        case 'no':
          chatbotResponse.text = 'Please answer with "yes" or "no".';
          break;
        default:
          chatbotResponse.text = 'I did not understand your response. Please choose from predefined answers.';
      }

      setChatbotMessages([...chatbotMessages, chatbotResponse]);

      // If the user's message was valid, display predefined answers
      if (isValidAnswer) {
        setPredefinedAnswers(['Medical assistance', 'Fire department', 'Police', 'Other']);
      }
    }, 1000);
  };

  const renderPredefinedAnswers = () => {
    return predefinedAnswers.map((answer, index) => (
      <TouchableOpacity
        key={index}
        style={styles.predefinedAnswerButton}
        onPress={() => handleSendMessage(answer)}
      >
        <Text style={styles.predefinedAnswerText}>{answer}</Text>
      </TouchableOpacity>
    ));
  };

  const renderMessages = () => {
    return messages.map((message, index) => (
      <View
        key={index}
        style={
          message.sender === 'user'
            ? styles.userMessageContainer
            : message.sender === 'chatbot'
            ? styles.chatbotMessageContainer
            : styles.personnelMessageContainer
        }
      >
        <Text
          style={
            message.sender === 'user'
              ? styles.userMessageText
              : message.sender === 'chatbot'
              ? styles.chatbotMessageText
              : styles.personnelMessageText
          }
        >
          {message.text}
        </Text>
      </View>
    ));
  };

  const messages = [...userMessages, ...chatbotMessages];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.messageContainer} showsVerticalScrollIndicator={false}>
        {renderMessages()}
      </ScrollView>

      {predefinedAnswers.length > 0 && (
        <View style={styles.predefinedAnswersContainer}>
          <Text style={styles.predefinedAnswersText}>
            Please select from the following options:
          </Text>
          <View style={styles.predefinedAnswersButtons}>{renderPredefinedAnswers()}</View>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type your message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={() => handleSendMessage(newMessage)}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
      <Bottombar navigation={navigation} unreadAlerts={11} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  messageContainer: {
    paddingVertical: 60,
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    borderRadius: 8,
    padding: 8,
    margin: 8,
    maxWidth: '70%',
  },
  chatbotMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: 'lightblue',
    borderRadius: 8,
    padding: 8,
    margin: 8,
    maxWidth: '70%',
  },
  personnelMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    margin: 8,
    maxWidth: '70%',
  },
  userMessageText: {
    fontSize: 16,
    color: 'black',
  },
  chatbotMessageText: {
    fontSize: 16,
    color: 'black',
  },
  personnelMessageText: {
    fontSize: 16,
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 10,
  },
  sendButtonText: {
    color: 'white',
  },
  predefinedAnswersContainer: {
    padding: 10,
  },
  predefinedAnswersText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
  },
  predefinedAnswersButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  predefinedAnswerButton: {
    backgroundColor: 'lightblue',
    borderRadius: 20,
    padding: 10,
    margin: 5,
  },
  predefinedAnswerText: {
    color: 'black',
  },
});

export default ChatScreen;
