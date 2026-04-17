import java.util.*;

class Marker {
    // UserQueue class implementation using two stacks
    static class UserQueue {
        private Stack<Integer> stack1; // For push operations
        private Stack<Integer> stack2; // For pop/peek operations
        
        public UserQueue() {
            stack1 = new Stack<>();
            stack2 = new Stack<>();
        }
        
        public void push(int x) {
            stack1.push(x);
        }
        
        public int pop() {
            if (stack2.isEmpty()) {
                while (!stack1.isEmpty()) {
                    stack2.push(stack1.pop());
                }
            }
            return stack2.pop();
        }
        
        public int peek() {
            if (stack2.isEmpty()) {
                while (!stack1.isEmpty()) {
                    stack2.push(stack1.pop());
                }
            }
            return stack2.peek();
        }
        
        public boolean empty() {
            return stack1.isEmpty() && stack2.isEmpty();
        }
    }
    
    // Process operations and return results
    public int[] solve(String[] operations, int[] values) {
        UserQueue queue = new UserQueue();
        List<Integer> results = new ArrayList<>();
        
        for (int i = 0; i < operations.length; i++) {
            String op = operations[i];
            if (op.equals("push")) {
                queue.push(values[i]);
            } else if (op.equals("pop")) {
                results.add(queue.pop());
            } else if (op.equals("peek")) {
                results.add(queue.peek());
            } else if (op.equals("empty")) {
                results.add(queue.empty() ? 1 : 0); // Convert boolean to int (1=true, 0=false)
            }
        }
        
        // Convert List to array
        int[] resultArray = new int[results.size()];
        for (int i = 0; i < results.size(); i++) {
            resultArray[i] = results.get(i);
        }
        return resultArray;
    }
    
    // Compare the output with expected result
    public boolean isCorrect(String[] operations, int[] values, int[] output) {
        int[] expected = solve(operations, values);
        
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

