class Marker {
    // Apply string operations: concatenate, delete uppercase, replace vowels
    public String solve(String A) {
        // Step 1: Concatenate the string with itself
        A = A + A;
        
        StringBuilder ans = new StringBuilder();
        
        // Step 2 & 3: Delete uppercase letters and replace vowels with '#'
        for (int i = 0; i < A.length(); i++) {
            char c = A.charAt(i);
            
            // Skip uppercase letters (ASCII 65-90)
            if (c >= 65 && c <= 90) {
                continue;
            }
            // Replace vowels with '#'
            else if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
                ans.append('#');
            }
            // Keep other characters (lowercase consonants)
            else {
                ans.append(c);
            }
        }
        
        return ans.toString();
    }

    // Compare the output with expected result
    public boolean isCorrect(String A, String output) {
        String expected = solve(A);
        return expected.equals(output);
    }
}

