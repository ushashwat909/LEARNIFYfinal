import java.util.*;
class Marker {
    // Returns (A^B) % C using fast exponentiation
    public int pow(int A, int B, int C) {
        // Handle negative A to ensure non-negative result
        long base = A % C;
        if (base < 0) {
            base = (base + C) % C;
        }
        return (int) power(base, B, C);
    }
    
    private long power(long x, int y, int C) {
        if (x == 0) {
            return 0;
        }
        if (y == 0) {
            return 1;
        }
        long p = power(x, y / 2, C);
        if (y % 2 == 0) {
            return (p * p) % C;
        } else {
            return ((p * p) % C * x) % C;
        }
    }

    // Compare the output with expected result
    public boolean isCorrect(int A, int B, int C, int output) {
        int expected = pow(A, B, C);
        return expected == output;
    }
}





