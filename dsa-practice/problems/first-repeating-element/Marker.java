import java.util.*;
class Marker {
    // Returns the first repeating element, or -1 if no repeating element exists
    public int solve(int[] A) {
        Map<Integer, Integer> hm = new HashMap<>();
        
        // Count frequency of each element
        for (int x : A) {
            if (hm.containsKey(x)) {
                hm.put(x, hm.get(x) + 1);
            } else {
                hm.put(x, 1);
            }
        }
        
        // Find first element with frequency > 1
        for (int x : A) {
            if (hm.get(x) > 1) {
                return x;
            }
        }
        
        return -1;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int output) {
        int expected = solve(A);
        return expected == output;
    }
}





