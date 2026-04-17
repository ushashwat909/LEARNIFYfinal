import java.util.*;
class Marker {
    // Returns the single number that appears once (others appear thrice)
    public int singleNumber(int[] A) {
        int ans = 0;
        for (int i = 0; i < 32; i++) {
            int cnt = 0;
            for (int x : A) {
                if ((x & (1 << i)) != 0) {
                    cnt++;
                }
            }
            if (cnt % 3 != 0) {
                ans = ans | (1 << i);
            }
        }
        return ans;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int output) {
        int expected = singleNumber(A);
        return expected == output;
    }
}





