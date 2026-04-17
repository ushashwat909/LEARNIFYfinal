import java.util.*;

class Marker {
    // Find maximum in each sliding window of size B
    public int[] slidingMaximum(int[] A, int B) {
        int n = A.length;
        
        // If B >= n, return array with single element containing max of entire array
        if (B >= n) {
            int max = A[0];
            for (int i = 1; i < n; i++) {
                if (A[i] > max) {
                    max = A[i];
                }
            }
            return new int[]{max};
        }
        
        List<Integer> ans = new ArrayList<>();
        Deque<Integer> dq = new ArrayDeque<>(); // Store indices
        
        // Initialize deque with first window
        dq.addLast(0);
        for (int i = 1; i < B; i++) {
            // Remove indices whose values are smaller than current element
            while (!dq.isEmpty() && A[i] > A[dq.peekLast()]) {
                dq.removeLast();
            }
            dq.addLast(i);
        }
        ans.add(A[dq.peekFirst()]);
        
        // Slide the window
        int start = 1;
        int end = B;
        while (end < n) {
            // Remove index that's outside the current window
            if (!dq.isEmpty() && dq.peekFirst() < start) {
                dq.removeFirst();
            }
            
            // Remove indices whose values are smaller than current element
            while (!dq.isEmpty() && A[end] > A[dq.peekLast()]) {
                dq.removeLast();
            }
            dq.addLast(end);
            
            ans.add(A[dq.peekFirst()]);
            start++;
            end++;
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
        int[] expected = slidingMaximum(A.clone(), B);
        
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

