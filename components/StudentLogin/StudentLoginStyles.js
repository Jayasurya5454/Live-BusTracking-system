// StudentLoginStyles.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
  },
  inputContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#004080',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderBottomWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#2596be',
    paddingVertical: 12,
    borderRadius: 25,
    width: '50%', 
  },
  buttonContainer: {
    alignItems: 'center',
    paddingTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  additionalUIContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  additionalUIText: {
    marginRight: 5,
    color: '#333',
  },
  signupButton: {
    padding: 5,
  },
  signupButtonText: {
    color: '#3c009d',
    fontWeight: 'bold',
  },
});

export default styles;
