import java.util.*;
class Marker {
    // Returns the maximum AND value among all pairs
    public int solve(int[] A) {
        int[] arr = A.clone(); // Work with a copy to avoid modifying original
        int ans = 0;
        for (int i = 31; i >= 0; i--) {
            int cnt = 0;
            for (int x : arr) {
                if ((x & (1 << i)) != 0) {
                    cnt++;
                    if (cnt == 2) {
                        break;
                    }
                }
            }
            if (cnt == 2) {
                ans = ans | (1 << i);
                for (int j = 0; j < arr.length; j++) {
                    if ((arr[j] & (1 << i)) == 0) {
                        arr[j] = 0;
                    }
                }
            }
        }
        return ans;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int output) {
        int expected = solve(A);
        return expected == output;
    }
}





