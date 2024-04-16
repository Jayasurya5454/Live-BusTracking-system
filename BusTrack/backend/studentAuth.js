import firebase from 'firebase/app';
import 'firebase/database'; // or 'firebase/firestore' if you're using Firestore

const database = firebase.database(); 

export const checkRollNumber = async (rollNumber) => {
  try {
    
    const studentsSnapshot = await database.ref('students').once('value');
    const studentsData = studentsSnapshot.val();

    if (studentsData) {
      const students = Object.values(studentsData);
      const rollNumbers = students.map(student => student.rollNumber);
      return rollNumbers.includes(rollNumber);
    } else {
      console.error('No students data found.');
      return false;
    }
  } catch (error) {
    console.error('Error fetching students data:', error);
    throw new Error('Unable to fetch students data. Please try again later.');
  }
};
