import java.util.*;
class Marker {
    // Returns the count of factors of A
    public int solve(int A) {
        int cnt = 0;
        int sqrt_n = (int) Math.sqrt(A);
        for (int i = 1; i <= sqrt_n; i++) {
            if (A % i == 0) {
                if (i == A / i) {
                    cnt += 1;
                } else {
                    cnt += 2;
                }
            }
        }
        return cnt;
    }

    // Compare the output with expected result
    public boolean isCorrect(int A, int output) {
        int expected = solve(A);
        return expected == output;
    }
}

