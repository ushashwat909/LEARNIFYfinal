import java.util.*;
class Marker {
    // Returns the number of pairs whose sum is divisible by B
    public int solve(int[] A, int B) {
        Map<Integer, Long> hm = new HashMap<>();
        long ans = 0;
        long mod = 1000000007L;
        
        for (int i = 0; i < A.length; i++) {
            int cur = (int)(((long)A[i] % B + B) % B);
            int target = (B - cur) % B;
            
            if (hm.containsKey(target)) {
                ans = (ans + hm.get(target)) % mod;
            }
            
            hm.put(cur, hm.getOrDefault(cur, 0L) + 1);
        }
        
        return (int)(ans % mod);
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int B, int output) {
        int expected = solve(A, B);
        return expected == output;
    }
}





