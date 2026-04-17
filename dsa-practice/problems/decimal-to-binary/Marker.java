class Marker {
    // Convert decimal to binary
    public String solve(int A) {
        if (A == 0) {
            return "0";
        }
        
        StringBuilder ans = new StringBuilder();
        int n = A;
        
        while (n != 0) {
            // Get the remainder (0 or 1)
            int remainder = n % 2;
            // Prepend to the result
            ans.insert(0, remainder);
            // Divide by 2
            n = n / 2;
        }
        
        return ans.toString();
    }

    // Compare the output with expected result
    public boolean isCorrect(int A, String output) {
        String expected = solve(A);
        return expected.equals(output);
    }
}

