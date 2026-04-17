class Marker {
    private static final int MOD = 1000000007;
    
    // Count pairs with sum equal to B using two pointers
    public int solve(int[] A, int B) {
        int n = A.length;
        int i = 0;
        int j = n - 1;
        long ans = 0; // Use long to prevent overflow before modulo
        
        while (i < j) {
            long sum = (long)A[i] + (long)A[j];
            
            if (sum == B) {
                if (A[i] == A[j]) {
                    // All elements from i to j are same
                    // Count all pairs: n*(n-1)/2
                    long count = j - i + 1;
                    ans = (ans + (count * (count - 1) / 2)) % MOD;
                    break;
                } else {
                    // Count duplicates on left and right
                    int leftCount = 1;
                    int rightCount = 1;
                    
                    // Count duplicates on left
                    while (i + 1 < j && A[i] == A[i + 1]) {
                        leftCount++;
                        i++;
                    }
                    
                    // Count duplicates on right
                    while (j - 1 > i && A[j] == A[j - 1]) {
                        rightCount++;
                        j--;
                    }
                    
                    // Add all combinations
                    ans = (ans + ((long)leftCount * (long)rightCount)) % MOD;
                    i++;
                    j--;
                }
            } else if (sum < B) {
                i++;
            } else {
                j--;
            }
        }
        
        return (int)ans;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int B, int output) {
        int expected = solve(A, B);
        return expected == output;
    }
}

