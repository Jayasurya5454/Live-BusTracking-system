import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray', // Background color for the entire screen
  },
  inputContainer: {
    width: '80%',
    backgroundColor: '#fff', // Background color for the input container
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
<<<<<<< HEAD
    color: '#004080',
=======
    color: '#3c009d', // Changed color for the title
>>>>>>> ba38b56bee576b26047aa0c37eba6a1fd269b397
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderBottomWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    paddingTop: 10,
  },
  button: {
    backgroundColor: '#2596be',
    paddingVertical: 12,
    borderRadius: 25, // Changed border radius for the button
    width: '50%', // Adjusted width for the button
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
    color: '#3c009d', // Changed color for additional UI text
  },
  signupButton: {
    padding: 5,
  },
  signupButtonText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});

export default styles;
