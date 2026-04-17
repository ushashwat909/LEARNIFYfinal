class Marker {
    // Find length of longest consecutive 1's after at most one swap
    public int solve(String A) {
        int n = A.length();
        int totalOnes = 0;
        
        // Count total number of 1's
        for (int i = 0; i < n; i++) {
            if (A.charAt(i) == '1') {
                totalOnes++;
            }
        }
        
        // If all characters are 1's, return length
        if (n == totalOnes) {
            return n;
        }
        
        int ans = 0;
        
        // For each 0, count consecutive 1's on left and right
        for (int i = 0; i < n; i++) {
            if (A.charAt(i) == '0') {
                int cntL = 0;
                int j = i - 1;
                // Count consecutive 1's on left
                while (j >= 0 && A.charAt(j) == '1') {
                    cntL++;
                    j--;
                }
                
                int cntR = 0;
                j = i + 1;
                // Count consecutive 1's on right
                while (j < n && A.charAt(j) == '1') {
                    cntR++;
                    j++;
                }
                
                // If all 1's are already used, we can only get cntL + cntR
                if (cntL + cntR == totalOnes) {
                    ans = Math.max(ans, cntL + cntR);
                } else {
                    // We can swap one more 1 from elsewhere
                    ans = Math.max(ans, cntL + cntR + 1);
                }
            }
        }
        
        return ans;
    }

    // Compare the output with expected result
    public boolean isCorrect(String A, int output) {
        int expected = solve(A);
        return expected == output;
    }
}

