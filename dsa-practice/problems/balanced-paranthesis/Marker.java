import java.util.*;

class Marker {
    // Check if the parenthesis sequence is balanced
    public int solve(String A) {
        Stack<Character> st = new Stack<>();
        
        for (int i = 0; i < A.length(); i++) {
            char ch = A.charAt(i);
            
            if (ch == '(' || ch == '[' || ch == '{') {
                st.push(ch);
            } else {
                // Closing bracket
                if (st.isEmpty()) {
                    return 0;
                }
                
                char top = st.peek();
                if ((ch == ')' && top == '(') || 
                    (ch == ']' && top == '[') || 
                    (ch == '}' && top == '{')) {
                    st.pop();
                } else {
                    return 0;
                }
            }
        }
        
        if (st.isEmpty()) {
            return 1;
        } else {
            return 0;
        }
    }

    // Compare the output with expected result
    public boolean isCorrect(String A, int output) {
        int expected = solve(A);
        return expected == output;
    }
}





