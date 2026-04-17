import java.util.*;
class Marker {
    // Returns the smallest number that can be formed by rearranging digits
    public int[] smallestNumber(int[] A) {
        int[] fq = new int[10]; // Frequency array for digits 0-9
        
        // Count frequency of each digit
        for (int x : A) {
            fq[x]++;
        }
        
        List<Integer> ans = new ArrayList<>();
        
        // Build result by adding each digit as many times as its frequency
        for (int i = 0; i < fq.length; i++) {
            int ele = i;
            for (int k = 0; k < fq[i]; k++) {
                ans.add(ele);
            }
        }
        
        // Convert List to array
        int[] result = new int[ans.size()];
        for (int i = 0; i < ans.size(); i++) {
            result[i] = ans.get(i);
        }
        return result;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int[] output) {
        int[] expected = smallestNumber(A);
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





