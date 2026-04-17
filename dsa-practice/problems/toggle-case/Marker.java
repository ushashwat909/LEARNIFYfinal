class Marker {
    // Toggle case of each character in the string
    public String solve(String A) {
        StringBuilder ans = new StringBuilder();
        
        for (int i = 0; i < A.length(); i++) {
            char c = A.charAt(i);
            
            // Check if uppercase (A-Z, ASCII 65-90)
            if (c >= 'A' && c <= 'Z') {
                // Convert to lowercase by adding 32
                ans.append((char)(c + 32));
            }
            // Check if lowercase (a-z, ASCII 97-122)
            else if (c >= 'a' && c <= 'z') {
                // Convert to uppercase by subtracting 32
                ans.append((char)(c - 32));
            }
            // Other characters remain unchanged
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

