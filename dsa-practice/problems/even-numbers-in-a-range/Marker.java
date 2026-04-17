import java.util.*;
class Marker {
    // Count even numbers in range using prefix sum
    public int[] solve(int[] A, int[][] B) {
        int n = A.length;
        int[] pf = new int[n];
        
        // Build prefix sum array for even numbers
        if (A[0] % 2 == 0) {
            pf[0] = 1;
        } else {
            pf[0] = 0;
        }
        
        for (int i = 1; i < n; i++) {
            if (A[i] % 2 == 0) {
                pf[i] = pf[i-1] + 1;
            } else {
                pf[i] = pf[i-1];
            }
        }
        
        int[] ans = new int[B.length];
        for (int i = 0; i < B.length; i++) {
            int l = B[i][0];
            int r = B[i][1];
            if (l == 0) {
                ans[i] = pf[r];
            } else {
                ans[i] = pf[r] - pf[l-1];
            }
        }
        return ans;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int[][] B, int[] output) {
        int[] expected = solve(A, B);
        if (expected.length != output.length) {
            return false;
        }
        for (int i = 0; i < expected.length; i++) {
            if (expected[i] != output[i]) {
                return false;
            }
        }
        return true;
    }
}

