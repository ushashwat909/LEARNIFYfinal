class Marker {
    // Convert integer to Excel column title
    public String convertToTitle(int A) {
        StringBuilder result = new StringBuilder();
        
        while (A > 0) {
            A--; // Convert from 1-indexed to 0-indexed
            result.append((char)(A % 26 + 'A'));
            A /= 26;
        }
        
        return result.reverse().toString();
    }

    // Compare the output with expected result
    public boolean isCorrect(int A, String output) {
        String expected = convertToTitle(A);
        return expected.equals(output);
    }
}

