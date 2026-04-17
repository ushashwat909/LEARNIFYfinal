import java.util.*;
class Marker {
    // Returns 1 if good pair exists, 0 otherwise
    public int solve(int[] A, int B) {
        Arrays.sort(A);
        int i = 0;
        int j = A.length - 1;
        while (i < j) {
            if (A[i] + A[j] == B) {
                return 1;
            } else if (A[i] + A[j] < B) {
                i++;
            } else {
                j--;
            }
        }
        return 0;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int B, int output) {
        int expected = solve(A, B);
        return expected == output;
    }
}


