class Marker {
    // Reverse words in a string
    public String solve(String A) {
        // Split by spaces and filter out empty strings (handles multiple spaces)
        String[] words = A.trim().split("\\s+");
        
        // Reverse the array of words
        int n = words.length;
        for (int i = 0; i < n / 2; i++) {
            String temp = words[i];
            words[i] = words[n - 1 - i];
            words[n - 1 - i] = temp;
        }
        
        // Join words with single space
        return String.join(" ", words);
    }

    // Compare the output with expected result
    public boolean isCorrect(String A, String output) {
        String expected = solve(A);
        return expected.equals(output);
    }
}

