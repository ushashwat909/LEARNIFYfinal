import java.util.*;
class Marker {
    // Reverse elements in array A within the range [B, C]
    public int[] solve(int[] A, int B, int C) {
        while (B < C) {
            int temp = A[B];
            A[B] = A[C];
            A[C] = temp;
            B++;
            C--;
        }
        return A;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int B, int C, int[] output) {
        int[] expected = solve(A.clone(), B, C);
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


