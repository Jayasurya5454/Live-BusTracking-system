import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const NotificationsToParents = () => {
  const [message, setMessage] = useState('');

  const handleMessageChange = (text) => {
    setMessage(text);
  };

  const handleSend = () => {
    // Here you can handle sending the message
    console.log('Sending message:', message);
    // Add your logic to send the message
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications to Parents</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          multiline
          placeholder="Write your message here"
          value={message}
          onChangeText={handleMessageChange}
        />
        <TouchableOpacity style={styles.button} onPress={handleSend}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  form: {
    width: '100%',
  },
  input: {
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
    textAlignVertical: 'top',
    paddingVertical: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NotificationsToParents;
