import java.util.*;
class Marker {
    // Range sum query using prefix sum
    public int[] solve(int[] A, int[][] B) {
        int n = A.length;
        long[] pf = new long[n];
        pf[0] = A[0];
        for (int i = 1; i < n; i++) {
            pf[i] = pf[i-1] + A[i];
        }
        
        int[] ans = new int[B.length];
        for (int i = 0; i < B.length; i++) {
            int l = B[i][0];
            int r = B[i][1];
            long sum;
            if (l == 0) {
                sum = pf[r];
            } else {
                sum = pf[r] - pf[l-1];
            }
            ans[i] = (int) sum;
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

