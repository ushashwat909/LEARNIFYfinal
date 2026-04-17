import java.util.*;
class Marker {
    // Returns the GCD of A and B using Euclidean algorithm
    public int gcd(int A, int B) {
        return hcf(A, B);
    }
    
    private int hcf(int A, int B) {
        if (B == 0) {
            return A;
        }
        return hcf(B, A % B);
    }

    // Compare the output with expected result
    public boolean isCorrect(int A, int B, int output) {
        int expected = gcd(A, B);
        return expected == output;
    }
}





