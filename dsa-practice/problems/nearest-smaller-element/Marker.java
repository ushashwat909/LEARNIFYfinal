import java.util.*;
class Marker {
    // Find nearest smaller element for each element in array A
    public int[] prevSmaller(int[] A) {
        int n = A.length;
        int[] ans = new int[n];
        Stack<Integer> st = new Stack<>();
        
        // Initialize with index 0
        st.push(0);
        ans[0] = -1;
        
        for (int i = 1; i < n; i++) {
            // Pop elements from stack while current element is <= stack top element
            while (!st.isEmpty() && A[i] <= A[st.peek()]) {
                st.pop();
            }
            // If stack is not empty, top element is the nearest smaller element
            if (!st.isEmpty()) {
                ans[i] = A[st.peek()];
            } else {
                ans[i] = -1;
            }
            // Push current index to stack
            st.push(i);
        }
        
        return ans;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int[] output) {
        int[] expected = prevSmaller(A.clone());
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





