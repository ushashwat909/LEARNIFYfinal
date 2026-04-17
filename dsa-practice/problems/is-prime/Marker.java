import java.util.*;
class Marker {
    // Returns 1 if A is prime, 0 otherwise
    public int solve(int A) {
        if (A < 2) {
            return 0;
        }
        int cnt = 0;
        int sqrt_A = (int) Math.sqrt(A);
        for (int i = 1; i <= sqrt_A; i++) {
            if (A % i == 0) {
                if (i == A / i) {
                    cnt += 1;
                } else {
                    cnt += 2;
                }
                if (cnt > 2) {
                    return 0;
                }
            }
        }
        if (cnt == 2) {
            return 1;
        } else {
            return 0;
        }
    }

    // Compare the output with expected result
    public boolean isCorrect(int A, int output) {
        int expected = solve(A);
        return expected == output;
    }
}


