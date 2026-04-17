class Marker {
    // Add two binary strings
    public String solve(String A, String B) {
        StringBuilder ans = new StringBuilder();
        int n = A.length();
        int m = B.length();
        int i = n - 1;
        int j = m - 1;
        int carry = 0;
        
        // Process from right to left
        while (i >= 0 || j >= 0 || carry > 0) {
            int cur = carry;
            
            // Add digit from A if available
            if (i >= 0) {
                cur += A.charAt(i) - '0';
                i--;
            }
            
            // Add digit from B if available
            if (j >= 0) {
                cur += B.charAt(j) - '0';
                j--;
            }
            
            // Current digit is cur % 2
            int r = cur % 2;
            ans.insert(0, r);
            
            // Carry is cur / 2
            carry = cur / 2;
        }
        
        return ans.toString();
    }

    // Compare the output with expected result
    public boolean isCorrect(String A, String B, String output) {
        String expected = solve(A, B);
        return expected.equals(output);
    }
}

