import java.util.*;
class Marker {
    // Find the size of smallest subarray containing both min and max
    public int solve(int[] A) {
        int maxEle = Arrays.stream(A).max().getAsInt();
        int minEle = Arrays.stream(A).min().getAsInt();
        
        int minIdx = -1;
        int maxIdx = -1;
        int ans = Integer.MAX_VALUE;
        
        for (int i = 0; i < A.length; i++) {
            if (A[i] == maxEle) {
                maxIdx = i;
            }
            if (A[i] == minEle) {
                minIdx = i;
            }
            if (minIdx != -1 && maxIdx != -1) {
                ans = Math.min(ans, Math.abs(maxIdx - minIdx) + 1);
            }
        }
        
        return ans;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int output) {
        int expected = solve(A);
        return expected == output;
    }
}

