import java.util.*;
class Marker {
    // Returns an array containing count of distinct numbers in all windows of size B
    public int[] dNums(int[] A, int B) {
        int n = A.length;
        
        // If B > N, return empty array
        if (B > n) {
            return new int[0];
        }
        
        Map<Integer, Integer> hm = new HashMap<>();
        
        // Initialize hashmap with first window
        for (int i = 0; i < B; i++) {
            if (hm.containsKey(A[i])) {
                hm.put(A[i], hm.get(A[i]) + 1);
            } else {
                hm.put(A[i], 1);
            }
        }
        
        List<Integer> ans = new ArrayList<>();
        ans.add(hm.size());
        
        // Slide the window
        int s = 1;
        int e = B;
        while (e < n) {
            // Remove leftmost element
            hm.put(A[s - 1], hm.get(A[s - 1]) - 1);
            if (hm.get(A[s - 1]) == 0) {
                hm.remove(A[s - 1]);
            }
            
            // Add rightmost element
            if (hm.containsKey(A[e])) {
                hm.put(A[e], hm.get(A[e]) + 1);
            } else {
                hm.put(A[e], 1);
            }
            
            ans.add(hm.size());
            
            s++;
            e++;
        }
        
        // Convert List to array
        int[] result = new int[ans.size()];
        for (int i = 0; i < ans.size(); i++) {
            result[i] = ans.get(i);
        }
        return result;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int B, int[] output) {
        int[] expected = dNums(A, B);
        if (expected.length != output.length) {
            return false;
        }
        for (int i = 0; i < expected.length; i++) {
            if (expected[i] != output[i]) {
                return false;
            }
        }
        return true;
    }
}





