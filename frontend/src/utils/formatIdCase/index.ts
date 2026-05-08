export function formatCaseID(id: number): string {
    // Check if the ID has less than 8 digits
    const idString = id.toString();
    if (idString.length >= 8) {
      return "CASE" + idString;
    } else {
      // If the ID has less than 8 digits, add leading zeros
      const zerosToAdd = 8 - idString.length;
      const paddedID = "0".repeat(zerosToAdd) + idString;
      return "CASE" + paddedID;
    }
  }
  
   // Test the function
//   console.log(formatCaseID(1)); // Output: CASE00000001
//   console.log(formatCaseID(12)); // Output: CASE00000012
//   console.log(formatCaseID(123)); // Output: CASE00000123
//   console.log(formatCaseID(12345678)); // Output: CASE12345678
  

export function extractIDFromCaseString(caseString: string): number | null {
    // Check if the input string starts with "CASE" and has at least 9 characters
    if (caseString.startsWith("CASE") && caseString.length >= 9) {
      // Extract the numeric part after "CASE"
      const numericPart = caseString.substring(4);
      // Parse the numeric part into a number and return it
      const id = parseInt(numericPart, 10);
      // Check if parsing was successful and return the result
      if (!isNaN(id)) {
        return id;
      }
    }
    // Return null if the input string doesn't match the expected format
    return null;
  }
  
  // Test the function
//   console.log(extractIDFromCaseString("CASE00000001")); // Output: 1
//   console.log(extractIDFromCaseString("CASE00000123")); // Output: 123
//   console.log(extractIDFromCaseString("CASE12345678")); // Output: 12345678
//   console.log(extractIDFromCaseString("INVALID_STRING")); // Output: null
  