import java.util.*;
class Marker {
    // Return subarray from index B to C (inclusive)
    public int[] solve(int[] A, int B, int C) {
        int[] ans = new int[C - B + 1];
        int idx = 0;
        for (int i = B; i <= C; i++) {
            ans[idx++] = A[i];
        }
        return ans;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int B, int C, int[] output) {
        int[] expected = solve(A, B, C);
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

