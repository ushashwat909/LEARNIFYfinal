import java.util.*;
class Marker {
    // Returns the total number of subarrays having sum equals to B
    public int solve(int[] A, int B) {
        int n = A.length;
        long[] pf = new long[n];
        
        // Build prefix sum array
        pf[0] = A[0];
        for (int i = 1; i < n; i++) {
            pf[i] = pf[i - 1] + A[i];
        }
        
        int cnt = 0;
        
        // Count prefix sums that directly equal B (subarrays starting from index 0)
        for (long x : pf) {
            if (x == B) {
                cnt++;
            }
        }
        
        // Use hashmap to count occurrences of prefix sums
        // For pf[r] - pf[l-1] = B, we need pf[l-1] = pf[r] - B
        Map<Long, Integer> hm = new HashMap<>();
        for (long x : pf) {
            long target = x - B;
            if (hm.containsKey(target)) {
                cnt += hm.get(target);
            }
            
            // Add current prefix sum to hashmap
            if (hm.containsKey(x)) {
                hm.put(x, hm.get(x) + 1);
            } else {
                hm.put(x, 1);
            }
        }
        
        return cnt;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int B, int output) {
        int expected = solve(A, B);
        return expected == output;
    }
}





