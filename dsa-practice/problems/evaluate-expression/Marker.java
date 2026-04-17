import java.util.*;

class Marker {
    // Check if string is a number (including negative numbers)
    private boolean isNumber(String s) {
        if (s == null || s.isEmpty()) {
            return false;
        }
        // Remove leading minus sign for negative numbers
        String num = s.startsWith("-") ? s.substring(1) : s;
        if (num.isEmpty()) {
            return false;
        }
        for (char c : num.toCharArray()) {
            if (!Character.isDigit(c)) {
                return false;
            }
        }
        return true;
    }
    
    // Evaluate Reverse Polish Notation expression
    public int evalRPN(String[] A) {
        Stack<Integer> st = new Stack<>();
        
        for (int i = 0; i < A.length; i++) {
            if (isNumber(A[i])) {
                st.push(Integer.parseInt(A[i]));
            } else {
                // Operator
                int y = st.pop();
                int x = st.pop();
                int ans = 0;
                
                if (A[i].equals("/")) {
                    ans = x / y;
                } else if (A[i].equals("*")) {
                    ans = x * y;
                } else if (A[i].equals("-")) {
                    ans = x - y;
                } else { // +
                    ans = x + y;
                }
                
                st.push(ans);
            }
        }
        
        return st.peek();
    }

    // Compare the output with expected result
    public boolean isCorrect(String[] A, int output) {
        int expected = evalRPN(A);
        return expected == output;
    }
}





