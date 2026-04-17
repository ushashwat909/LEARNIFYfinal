import java.util.*;
class Marker {
    // Returns 1 if array contains a subarray with sum 0, else 0
    public int solve(int[] A) {
        long[] pf = new long[A.length];
        pf[0] = A[0];
        
        // Check if first element is 0
        if (pf[0] == 0) {
            return 1;
        }
        
        // Build prefix sum array
        for (int i = 1; i < A.length; i++) {
            pf[i] = pf[i - 1] + A[i];
            // Check if any prefix sum is 0
            if (pf[i] == 0) {
                return 1;
            }
        }
        
        // Check if any prefix sum repeats
        Set<Long> hm = new HashSet<>();
        for (long x : pf) {
            if (hm.contains(x)) {
                return 1;
            }
            hm.add(x);
        }
        
        return 0;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int output) {
        int expected = solve(A);
        return expected == output;
    }
}





