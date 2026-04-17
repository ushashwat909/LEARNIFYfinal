class Marker {
    // Find longest palindromic substring using expand around centers
    public String solve(String A) {
        int maxSize = 0;
        int ansL = -1;
        int ansR = -1;
        int n = A.length();
        
        for (int i = 0; i < n; i++) {
            // Check for odd-length palindromes (centered at i)
            int l = i;
            int r = i;
            while (l >= 0 && r < n) {
                if (A.charAt(l) != A.charAt(r)) {
                    break;
                }
                l--;
                r++;
            }
            int al = l + 1;
            int ar = r - 1;
            int curSize = ar - al + 1;
            if (curSize > maxSize) {
                maxSize = curSize;
                ansL = al;
                ansR = ar;
            }
            
            // Check for even-length palindromes (centered between i and i+1)
            l = i;
            r = i + 1;
            while (l >= 0 && r < n) {
                if (A.charAt(l) != A.charAt(r)) {
                    break;
                }
                l--;
                r++;
            }
            al = l + 1;
            ar = r - 1;
            curSize = ar - al + 1;
            if (curSize > maxSize) {
                maxSize = curSize;
                ansL = al;
                ansR = ar;
            }
        }
        
        return A.substring(ansL, ansR + 1);
    }

    // Compare the output with expected result
    public boolean isCorrect(String A, String output) {
        String expected = solve(A);
        return expected.equals(output);
    }
}

