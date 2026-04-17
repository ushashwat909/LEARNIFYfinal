import java.util.*;
class Marker {
    // Returns count of pairs (i,j) such that A[i] - A[j] = B and i != j, modulo 10^9+7
    public int solve(int[] A, int B) {
        Map<Integer, Long> hm = new HashMap<>();
        long mod = 1000000007L;
        long cnt = 0;
        
        // A[i] - A[j] = B
        // For each A[i], we need to find A[j] = A[i] - B (so A[i] - (A[i] - B) = B)
        // Also, we can have A[j] - A[i] = B, which means A[j] = B + A[i]
        for (int i = 0; i < A.length; i++) {
            long target1 = (long)A[i] - B;
            long target2 = (long)B + A[i];
            
            // Add current element to hashmap first
            if (hm.containsKey(A[i])) {
                hm.put(A[i], hm.get(A[i]) + 1);
            } else {
                hm.put(A[i], 1L);
            }
            
            // Check for target1: A[i] - target1 = B
            if (hm.containsKey((int)target1)) {
                cnt = (cnt + hm.get((int)target1)) % mod;
            }
            
            // Check for target2: target2 - A[i] = B
            if (hm.containsKey((int)target2)) {
                cnt = (cnt + hm.get((int)target2)) % mod;
            }
        }
        
        return (int)(cnt % mod);
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int B, int output) {
        int expected = solve(A, B);
        return expected == output;
    }
}





