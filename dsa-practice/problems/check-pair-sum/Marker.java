import java.util.*;
class Marker {
    // Returns 1 if there exists a pair (i,j) such that B[i] + B[j] = A and i != j, else 0
    public int solve(int A, int[] B) {
        Map<Integer, Integer> hm = new HashMap<>();
        
        for (int i = 0; i < B.length; i++) {
            int target = A - B[i];
            if (hm.containsKey(target)) {
                return 1;
            }
            if (hm.containsKey(B[i])) {
                hm.put(B[i], hm.get(B[i]) + 1);
            } else {
                hm.put(B[i], 1);
            }
        }
        
        return 0;
    }

    // Compare the output with expected result
    public boolean isCorrect(int A, int[] B, int output) {
        int expected = solve(A, B);
        return expected == output;
    }
}





