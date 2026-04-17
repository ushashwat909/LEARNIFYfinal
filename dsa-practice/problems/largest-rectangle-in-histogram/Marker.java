import java.util.*;
class Marker {
    // Find the area of the largest rectangle in histogram
    public int largestRectangleArea(int[] A) {
        int n = A.length;
        
        // Find nearest smaller element on left (nsl)
        Stack<Integer> st = new Stack<>();
        int[] nsl = new int[n];
        st.push(0);
        nsl[0] = -1;
        
        for (int i = 1; i < n; i++) {
            while (!st.isEmpty() && A[i] <= A[st.peek()]) {
                st.pop();
            }
            if (!st.isEmpty()) {
                nsl[i] = st.peek();
            } else {
                nsl[i] = -1;
            }
            st.push(i);
        }
        
        // Find nearest smaller element on right (nsr)
        st.clear();
        int[] nsr = new int[n];
        st.push(n - 1);
        nsr[n - 1] = n;
        
        for (int i = n - 2; i >= 0; i--) {
            while (!st.isEmpty() && A[i] <= A[st.peek()]) {
                st.pop();
            }
            if (!st.isEmpty()) {
                nsr[i] = st.peek();
            } else {
                nsr[i] = n;
            }
            st.push(i);
        }
        
        // Calculate maximum area
        int ans = 0;
        for (int i = 0; i < n; i++) {
            int width = nsr[i] - nsl[i] - 1;
            int curAns = A[i] * width;
            ans = Math.max(ans, curAns);
        }
        
        return ans;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int output) {
        int expected = largestRectangleArea(A);
        return expected == output;
    }
}

