
import { ref, child, get } from "firebase/database";
import { db } from "./firebaseConfig";

export const checkRollNumberExists = async (rollNumber) => {
  try {
    const dbRef = ref(db, "students");
    const rollNumberRef = child(dbRef, rollNumber);
    const snapshot = await get(rollNumberRef);
    return snapshot.exists();
  } catch (error) {
    console.error("Error checking roll number:", error);
    return false;
  }
};

export const checkMultipleRollNumbers = async (rollNumbers) => {
  try {
    const results = {};
    for (const rollNumber of rollNumbers) {
      const exists = await checkRollNumberExists(rollNumber);
      results[rollNumber] = exists;
    }
    return results;
  } catch (error) {
    console.error("Error checking roll numbers:", error);
    return {};
  }
};
