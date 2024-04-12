// AdminLoginStyles.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', 
  },
  inputContainer: {
<<<<<<< HEAD
    height: 500,
    width:450,
    borderWidth: 1,
    borderColor: 'black',
   justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    overflow: 'hidden', 
    elevation: 10, // Use elevation to create a shadow effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },

  title: {
    fontSize: 38, 
    fontWeight: 'bold', 
    color:'#3c009d',
    marginBottom: 45,

  },

 

  input: {
    width: '80%',
    height: 60,
    borderBottomWidth: 1, // Add bottom border
    borderBottomColor: 'black', 
   
    marginVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16,
=======
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
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
>>>>>>> b2776eeab94cbe422775747ba11121b768efe9ea
  },
  buttonContainer: {
<<<<<<< HEAD
    width: '45%',
    
    marginTop: 50,
=======
    alignItems: 'center',
>>>>>>> b2776eeab94cbe422775747ba11121b768efe9ea
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 5,
    width: '50%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;
