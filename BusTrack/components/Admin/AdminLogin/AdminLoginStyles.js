// AdminLoginStyles.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#fff'
    
  },

  inputContainer: {
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
  },

  buttonContainer: {
    width: '45%',
    
    marginTop: 50,
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 35,
    backgroundColor: '#3c009d',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  

});

export default styles;
