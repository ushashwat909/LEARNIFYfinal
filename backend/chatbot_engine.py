"""
Learnify AI Chatbot Engine v3
Powered by Google Gemini API (google.genai SDK) with intelligent fallback.

- Full conversational AI via Gemini when API key is available
- Specialized system prompt for DSA/CS tutoring
- User profile awareness for personalization
- Graceful fallback to knowledge base if API unavailable or quota exceeded
"""
import os
import re
import random

# ============================================
# GEMINI AI INTEGRATION (new google.genai SDK)
# ============================================
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")

SYSTEM_PROMPT = """You are **Learnify Buddy**, an expert AI tutor specializing in Computer Science, Data Structures & Algorithms, and competitive programming. You are part of the Learnify learning platform.

## Your Personality
- Friendly, encouraging, and patient
- You explain complex concepts with simple analogies and real-world examples
- You use emojis sparingly but effectively to keep the conversation engaging
- You are concise but thorough — aim for responses under 300 words unless the topic requires depth

## Your Expertise
- **Data Structures**: Arrays, Linked Lists, Stacks, Queues, Trees (BST, AVL, Segment), Graphs, Hash Maps, Heaps, Tries
- **Algorithms**: Sorting, Searching, Dynamic Programming, Greedy, Divide & Conquer, Backtracking, Sliding Window, Two Pointers
- **Complexity Analysis**: Big O notation, time/space tradeoffs
- **Programming Languages**: Python, C++, Java — competitive programming tips
- **Problem-Solving**: Breaking down problems, identifying patterns, choosing approaches

## Response Guidelines
1. **Always provide code examples** when explaining algorithms/data structures (prefer Python)
2. **Use markdown formatting**: Bold for key terms, code blocks for code, bullet points for lists
3. **Include time/space complexity** when discussing algorithms
4. **Suggest related topics** to keep the learner engaged
5. **If the user shares code**, analyze it and suggest improvements
6. **If the user is stuck**, guide step-by-step instead of giving answers directly
7. **Encourage practice** and recommend trying problems in the Practice Hub

## What you should NOT do
- Don't answer questions unrelated to CS/programming/math (politely redirect)
- Don't write entire homework solutions without explanation
- Don't use overly academic language — keep it accessible
"""

# Initialize Gemini client
genai_client = None
try:
    if GEMINI_API_KEY:
        from google import genai
        genai_client = genai.Client(api_key=GEMINI_API_KEY)
        print("[Chatbot] Gemini AI initialized successfully ✅")
    else:
        print("[Chatbot] No GEMINI_API_KEY found. Using knowledge base fallback.")
except Exception as e:
    print(f"[Chatbot] Gemini init failed: {e}. Using knowledge base fallback.")
    genai_client = None

# Conversation history storage per user
conversation_histories = {}

def generate_chat_response(user_message: str, user_id: int = 0, user_profile: dict = None):
    """
    Generate an AI response. Uses Gemini if available, falls back to knowledge base.
    """
    # Try Gemini first
    if genai_client:
        try:
            # Build conversation history
            if user_id not in conversation_histories:
                conversation_histories[user_id] = []

            history = conversation_histories[user_id]

            # Build context message
            context = ""
            if user_profile and len(history) == 0:
                name = user_profile.get('username', 'Student')
                track = user_profile.get('study_track', 'General')
                level = user_profile.get('experience_level', 'unknown')
                context = f"[The student's name is {name}, studying {track}, experience level: {level}. Personalize your response.]\n\n"

            # Build contents for multi-turn conversation
            contents = [{"role": "user", "parts": [{"text": SYSTEM_PROMPT}]},
                        {"role": "model", "parts": [{"text": "Understood! I'm Learnify Buddy, ready to help with CS and DSA. What would you like to learn?"}]}]

            # Add conversation history (last 10 turns)
            for msg in history[-10:]:
                contents.append(msg)

            # Add current message
            contents.append({"role": "user", "parts": [{"text": context + user_message}]})

            response = genai_client.models.generate_content(
                model="gemini-2.0-flash",
                contents=contents
            )

            reply = response.text

            # Save to history
            history.append({"role": "user", "parts": [{"text": user_message}]})
            history.append({"role": "model", "parts": [{"text": reply}]})

            # Trim history to last 20 messages
            if len(history) > 20:
                conversation_histories[user_id] = history[-20:]

            return reply

        except Exception as e:
            error_msg = str(e)
            print(f"[Chatbot] Gemini error: {error_msg}")
            # If rate limited, fall through to knowledge base
            if "429" in error_msg or "RESOURCE_EXHAUSTED" in error_msg:
                print("[Chatbot] Rate limited — using knowledge base fallback")
            # Fall through to knowledge base

    # Fallback: Knowledge base matching
    return _knowledge_base_response(user_message)


# ============================================
# KNOWLEDGE BASE FALLBACK
# ============================================
KNOWLEDGE_BASE = [
    # ===================== DATA STRUCTURES =====================
    {
        "patterns": ["array", "arrays", "list", "index", "element", "contiguous"],
        "topic": "Arrays",
        "responses": [
            "An **array** stores elements at contiguous memory locations with O(1) index access.\n\n**Complexities:**\n- Access: O(1)\n- Search: O(n)\n- Insert/Delete at end: O(1) amortized\n- Insert/Delete at position: O(n)\n\n**Common patterns:** Two pointers, Sliding window, Prefix sums\n\nWant me to explain a specific pattern?",
        ]
    },
    {
        "patterns": ["linked list", "linkedlist", "node", "singly", "doubly"],
        "topic": "Linked Lists",
        "responses": [
            "A **Linked List** connects elements through pointers.\n\n**Types:** Singly, Doubly, Circular\n**Insert at head:** O(1) | **Search:** O(n) | **Delete with ref:** O(1)\n\n**Key problems:** Reverse a list, detect cycle (Floyd's), merge two sorted lists\n\nWant to compare linked lists vs arrays?",
        ]
    },
    {
        "patterns": ["stack", "push", "pop", "lifo", "parentheses", "balanced"],
        "topic": "Stacks",
        "responses": [
            "A **Stack** = LIFO (Last In, First Out)\n\n**Operations (all O(1)):** `push`, `pop`, `peek`\n\n**Uses:** Balanced parentheses, Undo/Redo, DFS, Expression evaluation, Monotonic stack\n\n```python\nstack = []\nstack.append(1)  # push\nstack.pop()       # pop\n```\n\nWant a stack problem walkthrough?",
        ]
    },
    {
        "patterns": ["queue", "enqueue", "dequeue", "fifo"],
        "topic": "Queues",
        "responses": ["A **Queue** = FIFO. Variants: Priority Queue (heap), Deque, Circular Queue.\n**Used in:** BFS, scheduling, LRU cache"]
    },
    {
        "patterns": ["tree", "binary tree", "bst", "binary search tree", "root", "leaf", "inorder", "preorder", "postorder", "traversal"],
        "topic": "Trees",
        "responses": [
            "**Trees** are hierarchical. **BST:** Left < Parent < Right\n\n**Traversals:**\n- **Inorder** (LNR): Sorted order\n- **Preorder** (NLR): Copy/serialize\n- **Postorder** (LRN): Delete\n- **Level-order**: BFS\n\n**Balanced BST:** O(log n) operations\n\n**Advanced:** AVL, Red-Black, Segment, Fenwick trees",
        ]
    },
    {
        "patterns": ["graph", "vertex", "edge", "adjacency", "directed", "undirected", "dijkstra", "shortest path", "topological"],
        "topic": "Graphs",
        "responses": [
            "**Graphs** = vertices + edges.\n\n**Algorithms:**\n- **BFS:** Shortest unweighted path, O(V+E)\n- **DFS:** Cycle detection, topological sort\n- **Dijkstra:** Shortest weighted path, O((V+E)log V)\n- **Bellman-Ford:** Handles negative weights\n- **Floyd-Warshall:** All pairs shortest path\n- **Kruskal/Prim:** Minimum spanning tree\n\nWhich algorithm interests you?",
        ]
    },
    {
        "patterns": ["hash", "hashmap", "dictionary", "hash table", "collision", "hashing"],
        "topic": "Hash Maps",
        "responses": ["**Hash Map** = O(1) average lookup for key-value pairs.\n\n**Collision handling:** Chaining (linked lists) or Open addressing (linear/quadratic probing)\n\n**Uses:** Two Sum, frequency counting, caching, dedup, anagram detection\n\n```python\nfrom collections import Counter\nfreq = Counter([1,2,2,3])  # {2:2, 1:1, 3:1}\n```"]
    },
    {
        "patterns": ["heap", "priority queue", "min heap", "max heap", "kth largest", "heapify"],
        "topic": "Heaps",
        "responses": ["**Heap** = complete binary tree with heap property.\n\n- **Min-Heap:** Root = smallest\n- **Max-Heap:** Root = largest\n- Insert/Extract: O(log n), Peek: O(1), Heapify: O(n)\n\n**Problems:** Kth largest, Merge K lists, Running median, Top K frequent\n\n```python\nimport heapq\nheapq.heappush(h, 5)\nsmallest = heapq.heappop(h)\n```"]
    },
    {
        "patterns": ["trie", "prefix tree", "autocomplete", "word search"],
        "topic": "Tries",
        "responses": ["A **Trie** (prefix tree) stores strings character-by-character.\n\n**Operations:** Insert O(L), Search O(L), Prefix check O(L) — where L = word length\n\n**Uses:** Autocomplete, Spell checker, IP routing, Word games\n\n```python\nclass TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.is_end = False\n```\n\nWant to implement one together?"]
    },
    {
        "patterns": ["segment tree", "range query", "range sum", "fenwick", "binary indexed tree"],
        "topic": "Segment Trees",
        "responses": ["**Segment Tree** handles range queries + point updates in O(log n).\n\n**Use cases:** Range sum, Range min/max, Count of elements in range\n\n**Fenwick Tree (BIT):** Simpler, but only for prefix operations.\n\n| Operation | Naive | Segment Tree |\n|-----------|-------|--------------|\n| Query | O(n) | O(log n) |\n| Update | O(1) | O(log n) |\n| Build | O(n) | O(n) |"]
    },
    {
        "patterns": ["disjoint set", "union find", "union-find", "connected components"],
        "topic": "Union-Find",
        "responses": ["**Union-Find (Disjoint Set)** tracks connected components.\n\n**Operations:** `find(x)` and `union(x, y)` — nearly O(1) with path compression + union by rank\n\n**Uses:** Kruskal's MST, cycle detection in undirected graphs, connected components\n\n```python\ndef find(parent, x):\n    if parent[x] != x:\n        parent[x] = find(parent, parent[x])  # path compression\n    return parent[x]\n```"]
    },

    # ===================== ALGORITHMS =====================
    {
        "patterns": ["dynamic programming", "dp", "memoization", "tabulation", "overlapping", "subproblem", "knapsack"],
        "topic": "Dynamic Programming",
        "responses": [
            "**DP** breaks problems into overlapping subproblems.\n\n**Approaches:**\n1. **Top-down (Memoization):** Recursive + cache\n2. **Bottom-up (Tabulation):** Iterative\n\n**Steps:** Define state → Recurrence → Base cases → Code → Optimize space\n\n**Classic:** Fibonacci, Knapsack, LCS, LIS, Coin Change, Edit Distance, Matrix Chain\n\nWant a step-by-step walkthrough?",
        ]
    },
    {
        "patterns": ["sort", "sorting", "bubble sort", "merge sort", "quick sort", "insertion sort", "heap sort", "radix sort", "counting sort"],
        "topic": "Sorting",
        "responses": [
            "**Sorting comparison:**\n\n| Algorithm | Average | Worst | Space | Stable? |\n|-----------|---------|-------|-------|---------|\n| Merge | O(n log n) | O(n log n) | O(n) | ✅ |\n| Quick | O(n log n) | O(n²) | O(log n) | ❌ |\n| Heap | O(n log n) | O(n log n) | O(1) | ❌ |\n| Counting | O(n+k) | O(n+k) | O(k) | ✅ |\n| Radix | O(d·n) | O(d·n) | O(n) | ✅ |\n\nWhich one do you want to explore?",
        ]
    },
    {
        "patterns": ["binary search", "search", "sorted array", "log n", "bisect"],
        "topic": "Binary Search",
        "responses": ["**Binary Search** = O(log n) by halving the search space.\n\n```python\ndef binary_search(arr, target):\n    lo, hi = 0, len(arr) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if arr[mid] == target: return mid\n        elif arr[mid] < target: lo = mid + 1\n        else: hi = mid - 1\n    return -1\n```\n\n**Variations:** Search on answer, lower/upper bound, rotated array, peak element"]
    },
    {
        "patterns": ["recursion", "recursive", "base case", "backtracking", "factorial"],
        "topic": "Recursion & Backtracking",
        "responses": ["**Recursion** = function calls itself. Needs: **base case** + **recursive case**.\n\n**Backtracking** = recursion + undo choices that don't work.\n\n```python\ndef permutations(arr, path=[]):\n    if not arr: print(path)\n    for i in range(len(arr)):\n        permutations(arr[:i]+arr[i+1:], path+[arr[i]])\n```\n\n**Classic:** N-Queens, Sudoku solver, Subset sum, Permutations, Combinations"]
    },
    {
        "patterns": ["greedy", "greedy algorithm", "activity selection", "huffman"],
        "topic": "Greedy",
        "responses": ["**Greedy** = locally optimal choice at each step.\n\n**When it works:** Optimal substructure + Greedy choice property\n\n**Classic:** Activity Selection, Fractional Knapsack, Huffman Coding, Dijkstra, Prim/Kruskal MST, Job Scheduling\n\n⚠️ If greedy doesn't work, try DP!"]
    },
    {
        "patterns": ["two pointer", "two pointers", "sliding window", "window"],
        "topic": "Two Pointers & Sliding Window",
        "responses": ["**Two Pointers:** Two indices on sorted data. O(n).\n**Sliding Window:** Expand/contract a window for subarray problems.\n\n```python\n# Max sum subarray of size k\ndef max_sum(arr, k):\n    window = sum(arr[:k])\n    best = window\n    for i in range(k, len(arr)):\n        window += arr[i] - arr[i-k]\n        best = max(best, window)\n    return best\n```\n\n**Problems:** Two Sum, 3Sum, Max subarray, Longest substring without repeats"]
    },
    {
        "patterns": ["bit manipulation", "bitwise", "xor", "and", "or", "bit mask", "bitmask"],
        "topic": "Bit Manipulation",
        "responses": ["**Bit Manipulation** cheat sheet:\n\n| Operation | Code | Use |\n|-----------|------|-----|\n| Check bit i | `n & (1 << i)` | Is bit set? |\n| Set bit i | `n \\| (1 << i)` | Turn on |\n| Clear bit i | `n & ~(1 << i)` | Turn off |\n| Toggle bit i | `n ^ (1 << i)` | Flip |\n| Count bits | `bin(n).count('1')` | Hamming weight |\n| Power of 2 | `n & (n-1) == 0` | Check |\n\n**XOR tricks:** `a ^ a = 0`, `a ^ 0 = a` → Find single number in O(n)"]
    },
    {
        "patterns": ["string", "strings", "substring", "palindrome", "anagram", "kmp", "rabin karp", "pattern matching"],
        "topic": "String Algorithms",
        "responses": ["**String algorithms:**\n\n- **KMP:** Pattern matching in O(n+m) using failure function\n- **Rabin-Karp:** Rolling hash for pattern matching\n- **Z-Algorithm:** All occurrences of pattern\n- **Manacher's:** Longest palindrome substring in O(n)\n\n**Common problems:**\n- Longest palindromic substring\n- Anagram detection (sorting or frequency map)\n- Longest common substring (DP)\n- String reversal, rotation\n\nWhich string problem are you working on?"]
    },

    # ===================== OOPs =====================
    {
        "patterns": ["oops", "oop", "object oriented", "object-oriented", "class", "object", "classes and objects"],
        "topic": "OOP Fundamentals",
        "responses": ["**Object-Oriented Programming (OOP)** has 4 pillars:\n\n1. **Encapsulation:** Bundle data + methods, hide internals\n2. **Abstraction:** Show only essentials, hide complexity\n3. **Inheritance:** Child class inherits parent's properties\n4. **Polymorphism:** Same interface, different implementations\n\n```python\nclass Animal:\n    def __init__(self, name):\n        self.name = name  # Encapsulation\n    def speak(self):       # Polymorphism\n        raise NotImplementedError\n\nclass Dog(Animal):          # Inheritance\n    def speak(self):\n        return 'Woof!'\n```\n\nWhich pillar would you like to explore deeper?"]
    },
    {
        "patterns": ["encapsulation", "private", "protected", "public", "access modifier", "getter", "setter"],
        "topic": "Encapsulation",
        "responses": ["**Encapsulation** = bundling data + methods and controlling access.\n\n**Access Modifiers:**\n| Modifier | Python | Java | C++ |\n|----------|--------|------|-----|\n| Public | `self.x` | `public` | `public:` |\n| Protected | `self._x` | `protected` | `protected:` |\n| Private | `self.__x` | `private` | `private:` |\n\n```python\nclass BankAccount:\n    def __init__(self):\n        self.__balance = 0  # private\n    def deposit(self, amount):\n        if amount > 0:\n            self.__balance += amount\n    def get_balance(self):  # getter\n        return self.__balance\n```\n\n**Why?** Prevents direct modification of sensitive data."]
    },
    {
        "patterns": ["inheritance", "extends", "super", "parent class", "child class", "base class", "derived"],
        "topic": "Inheritance",
        "responses": ["**Inheritance** = child class reuses/extends parent class.\n\n**Types:**\n- **Single:** A → B\n- **Multilevel:** A → B → C\n- **Hierarchical:** A → B, A → C\n- **Multiple:** A, B → C (Python supports, Java uses interfaces)\n\n```python\nclass Vehicle:\n    def __init__(self, speed):\n        self.speed = speed\n\nclass Car(Vehicle):  # inherits Vehicle\n    def __init__(self, speed, seats):\n        super().__init__(speed)  # call parent\n        self.seats = seats\n```\n\n**Diamond Problem:** When two parents have same method → resolved with MRO in Python."]
    },
    {
        "patterns": ["polymorphism", "method overriding", "method overloading", "override", "overload"],
        "topic": "Polymorphism",
        "responses": ["**Polymorphism** = \"many forms\" — same interface, different behavior.\n\n**Types:**\n1. **Compile-time (Overloading):** Same name, different parameters\n2. **Runtime (Overriding):** Child redefines parent's method\n\n```python\nclass Shape:\n    def area(self): pass\n\nclass Circle(Shape):\n    def __init__(self, r): self.r = r\n    def area(self): return 3.14 * self.r ** 2  # overriding\n\nclass Square(Shape):\n    def __init__(self, s): self.s = s\n    def area(self): return self.s ** 2  # overriding\n\n# Polymorphism in action:\nfor shape in [Circle(5), Square(4)]:\n    print(shape.area())  # different behavior!\n```"]
    },
    {
        "patterns": ["abstraction", "abstract class", "interface", "abstract method", "abc"],
        "topic": "Abstraction",
        "responses": ["**Abstraction** = hide complexity, show only essentials.\n\n**Abstract Class:** Can't be instantiated. Forces subclasses to implement methods.\n\n```python\nfrom abc import ABC, abstractmethod\n\nclass Database(ABC):  # abstract\n    @abstractmethod\n    def connect(self): pass\n    @abstractmethod\n    def query(self, sql): pass\n\nclass MySQL(Database):\n    def connect(self): return 'Connected to MySQL'\n    def query(self, sql): return f'Running: {sql}'\n```\n\n**Interface vs Abstract Class:**\n- Interface: Only method signatures (Java)\n- Abstract: Can have some implemented methods"]
    },
    {
        "patterns": ["solid", "solid principles", "single responsibility", "open closed", "liskov", "dependency inversion"],
        "topic": "SOLID Principles",
        "responses": ["**SOLID** — 5 principles of good OOP design:\n\n1. **S — Single Responsibility:** One class, one job\n2. **O — Open/Closed:** Open for extension, closed for modification\n3. **L — Liskov Substitution:** Subtypes must be substitutable for base types\n4. **I — Interface Segregation:** Many small interfaces > one big one\n5. **D — Dependency Inversion:** Depend on abstractions, not concretions\n\n**Example of S:**\n```python\n# ❌ Bad: class does too much\nclass User:\n    def save_to_db(self): ...\n    def send_email(self): ...\n    def generate_report(self): ...\n\n# ✅ Good: separate responsibilities\nclass User: ...\nclass UserRepository: ...\nclass EmailService: ...\n```"]
    },
    {
        "patterns": ["design pattern", "design patterns", "singleton", "factory", "observer", "strategy", "decorator pattern"],
        "topic": "Design Patterns",
        "responses": ["**Design Patterns** — proven solutions to common problems:\n\n**Creational:**\n- **Singleton:** One instance only (DB connection)\n- **Factory:** Create objects without specifying class\n- **Builder:** Step-by-step complex object creation\n\n**Structural:**\n- **Adapter:** Make incompatible interfaces work together\n- **Decorator:** Add behavior dynamically\n- **Facade:** Simple interface to complex system\n\n**Behavioral:**\n- **Observer:** Notify subscribers of changes (event system)\n- **Strategy:** Swap algorithms at runtime\n- **Iterator:** Sequential access to elements\n\nWhich pattern would you like a code example for?"]
    },

    # ===================== OS CONCEPTS =====================
    {
        "patterns": ["operating system", "os", "process", "thread", "scheduling", "context switch"],
        "topic": "Operating Systems",
        "responses": ["**Operating System** fundamentals:\n\n**Process vs Thread:**\n| Feature | Process | Thread |\n|---------|---------|--------|\n| Memory | Separate | Shared |\n| Creation | Heavy | Light |\n| Communication | IPC (pipes, sockets) | Shared memory |\n| Crash impact | Isolated | Can crash process |\n\n**CPU Scheduling:** FCFS, SJF, Round Robin, Priority, MLFQ\n\n**Key concepts:** Context switching, Deadlock, Mutex, Semaphore, Virtual memory, Paging\n\nWhich OS concept would you like to dive into?"]
    },
    {
        "patterns": ["deadlock", "mutex", "semaphore", "race condition", "concurrency", "synchronization", "lock"],
        "topic": "Concurrency & Deadlocks",
        "responses": ["**Deadlock** = two+ processes waiting for each other forever.\n\n**4 conditions (ALL needed):**\n1. Mutual Exclusion\n2. Hold and Wait\n3. No Preemption\n4. Circular Wait\n\n**Prevention:** Break any one condition!\n\n**Mutex vs Semaphore:**\n- **Mutex:** Binary lock (1 thread at a time)\n- **Semaphore:** Counter (N threads at a time)\n\n```python\nimport threading\nlock = threading.Lock()\nwith lock:  # mutex\n    shared_resource += 1\n```\n\n**Race Condition:** Multiple threads modify shared data → unpredictable results."]
    },
    {
        "patterns": ["memory management", "paging", "segmentation", "virtual memory", "page fault", "cache", "ram"],
        "topic": "Memory Management",
        "responses": ["**Memory Management:**\n\n**Virtual Memory:** Each process thinks it has full memory. OS maps virtual → physical.\n\n**Paging:** Memory split into fixed-size pages (4KB). **Page Table** maps virtual → physical.\n\n**Page Replacement:** When memory is full:\n- **FIFO:** Replace oldest page\n- **LRU:** Replace least recently used ✅\n- **Optimal:** Replace page not needed longest (theoretical)\n\n**Cache Hierarchy:** L1 (fastest, smallest) → L2 → L3 → RAM → SSD → HDD\n\n**Fragmentation:**\n- Internal: Wasted space within allocated block\n- External: Free memory scattered in small chunks"]
    },

    # ===================== DBMS =====================
    {
        "patterns": ["database", "dbms", "sql", "mysql", "postgres", "relational", "table", "schema"],
        "topic": "Database Fundamentals",
        "responses": ["**Database** basics:\n\n**SQL vs NoSQL:**\n| Feature | SQL | NoSQL |\n|---------|-----|-------|\n| Structure | Tables (rows/cols) | Documents/Key-value |\n| Schema | Fixed | Flexible |\n| Scaling | Vertical | Horizontal |\n| Examples | MySQL, PostgreSQL | MongoDB, Redis |\n| Best for | Complex queries | High throughput |\n\n**Key SQL:**\n```sql\nSELECT name, COUNT(*) \nFROM students \nWHERE grade > 80 \nGROUP BY name \nHAVING COUNT(*) > 1 \nORDER BY name;\n```\n\nWhat database concept do you want to explore?"]
    },
    {
        "patterns": ["normalization", "normal form", "1nf", "2nf", "3nf", "bcnf", "denormalization"],
        "topic": "Normalization",
        "responses": ["**Normalization** reduces data redundancy:\n\n- **1NF:** Atomic values, no repeating groups\n- **2NF:** 1NF + No partial dependencies (all non-key cols depend on full PK)\n- **3NF:** 2NF + No transitive dependencies\n- **BCNF:** Every determinant is a candidate key\n\n**Example:**\n```\n❌ Student(id, name, course, teacher)  # teacher depends on course\n✅ Student(id, name, course_id)  +  Course(course_id, name, teacher)\n```\n\n**Denormalization:** Sometimes we reverse this for performance (read-heavy systems)."]
    },
    {
        "patterns": ["acid", "transaction", "commit", "rollback", "isolation level"],
        "topic": "ACID Properties",
        "responses": ["**ACID** — guarantees for database transactions:\n\n1. **Atomicity:** All or nothing (no partial updates)\n2. **Consistency:** DB stays valid before and after transaction\n3. **Isolation:** Concurrent transactions don't interfere\n4. **Durability:** Committed data survives crashes\n\n**Isolation Levels:**\n- Read Uncommitted → Dirty reads possible\n- Read Committed → No dirty reads\n- Repeatable Read → No phantom reads (MySQL default)\n- Serializable → Full isolation (slowest)\n\n```sql\nBEGIN TRANSACTION;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\nCOMMIT;\n```"]
    },
    {
        "patterns": ["join", "inner join", "outer join", "left join", "right join", "cross join"],
        "topic": "SQL Joins",
        "responses": ["**SQL Joins** combine data from multiple tables:\n\n| Join Type | Returns |\n|-----------|---------|\n| **INNER** | Only matching rows |\n| **LEFT** | All from left + matches from right |\n| **RIGHT** | All from right + matches from left |\n| **FULL OUTER** | All rows from both |\n| **CROSS** | Cartesian product (every combo) |\n\n```sql\nSELECT s.name, c.title\nFROM students s\nINNER JOIN enrollments e ON s.id = e.student_id\nINNER JOIN courses c ON e.course_id = c.id;\n```\n\n**Tip:** Always visualize joins as Venn diagrams!"]
    },
    {
        "patterns": ["indexing", "index", "b-tree", "b+ tree", "clustered", "non-clustered"],
        "topic": "Database Indexing",
        "responses": ["**Indexing** speeds up queries by avoiding full table scans.\n\n**Types:**\n- **B-Tree:** Balanced tree, good for range queries ✅\n- **Hash:** O(1) exact match, no range support\n- **Clustered:** Data physically sorted (one per table)\n- **Non-clustered:** Separate pointer structure (multiple allowed)\n\n```sql\nCREATE INDEX idx_name ON students(name);\n-- Now: SELECT * FROM students WHERE name = 'Alice'  → fast!\n```\n\n**Trade-off:** Faster reads, slower writes (index must be updated)"]
    },

    # ===================== NETWORKING =====================
    {
        "patterns": ["networking", "network", "tcp", "udp", "ip", "protocol", "osi", "osi model"],
        "topic": "Computer Networking",
        "responses": ["**OSI Model** (7 layers):\n\n| Layer | Name | Protocol | Function |\n|-------|------|----------|----------|\n| 7 | Application | HTTP, FTP, DNS | User interface |\n| 6 | Presentation | SSL/TLS, JPEG | Encryption/Format |\n| 5 | Session | NetBIOS | Connection management |\n| 4 | Transport | TCP/UDP | Reliable delivery |\n| 3 | Network | IP, ICMP | Routing |\n| 2 | Data Link | Ethernet, WiFi | Frame delivery |\n| 1 | Physical | Cables, Signals | Bits on wire |\n\n**TCP vs UDP:**\n- TCP: Reliable, ordered, connection-oriented (HTTP, SSH)\n- UDP: Fast, no guarantee (Gaming, Video, DNS)"]
    },
    {
        "patterns": ["http", "https", "rest", "api", "status code", "get", "post", "put", "delete"],
        "topic": "HTTP & REST APIs",
        "responses": ["**HTTP Methods:**\n\n| Method | Purpose | Idempotent? |\n|--------|---------|-------------|\n| GET | Read data | ✅ |\n| POST | Create data | ❌ |\n| PUT | Update (full) | ✅ |\n| PATCH | Update (partial) | ❌ |\n| DELETE | Remove data | ✅ |\n\n**Status Codes:**\n- 200 OK, 201 Created, 204 No Content\n- 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found\n- 500 Internal Server Error, 503 Service Unavailable\n\n**REST Principles:** Stateless, Resource-based URLs, JSON responses"]
    },
    {
        "patterns": ["dns", "domain name", "ip address", "ipv4", "ipv6", "subnet"],
        "topic": "DNS & IP",
        "responses": ["**DNS** translates domain names → IP addresses.\n\n**Resolution flow:** Browser cache → OS cache → Router → ISP DNS → Root → TLD → Authoritative\n\n**IP Addresses:**\n- **IPv4:** 32-bit (192.168.1.1), ~4.3 billion addresses\n- **IPv6:** 128-bit (2001:db8::1), virtually unlimited\n\n**Subnetting:** Divides network into smaller segments.\n- /24 = 256 addresses (255.255.255.0)\n- /16 = 65,536 addresses\n\n**Ports:** HTTP=80, HTTPS=443, SSH=22, DNS=53, FTP=21"]
    },

    # ===================== SYSTEM DESIGN =====================
    {
        "patterns": ["system design", "scalability", "load balancer", "microservices", "distributed"],
        "topic": "System Design Basics",
        "responses": ["**System Design** fundamentals:\n\n**Key concepts:**\n- **Load Balancer:** Distributes traffic across servers (Nginx, HAProxy)\n- **CDN:** Cache content geographically close to users\n- **Caching:** Redis, Memcached for fast data access\n- **Database Sharding:** Split data across multiple DBs\n- **Replication:** Master-slave for read scaling\n- **Message Queues:** Kafka, RabbitMQ for async processing\n\n**Monolith vs Microservices:**\n- Monolith: Simple, single deployment\n- Microservices: Independent, scalable, but complex\n\nWant me to walk through designing a specific system?"]
    },
    {
        "patterns": ["caching", "redis", "memcached", "cache", "lru", "cache invalidation"],
        "topic": "Caching",
        "responses": ["**Caching** = store frequently accessed data for fast retrieval.\n\n**Strategies:**\n- **Cache-Aside:** App checks cache → miss → query DB → update cache\n- **Write-Through:** Write to cache + DB simultaneously\n- **Write-Behind:** Write to cache, async write to DB\n\n**Eviction Policies:** LRU (most common), LFU, FIFO, TTL\n\n**LRU Cache** implementation:\n```python\nfrom collections import OrderedDict\nclass LRU:\n    def __init__(self, cap):\n        self.cache = OrderedDict()\n        self.cap = cap\n    def get(self, key):\n        if key in self.cache:\n            self.cache.move_to_end(key)\n            return self.cache[key]\n    def put(self, key, val):\n        self.cache[key] = val\n        self.cache.move_to_end(key)\n        if len(self.cache) > self.cap:\n            self.cache.popitem(last=False)\n```"]
    },
    {
        "patterns": ["cap theorem", "consistency", "availability", "partition tolerance"],
        "topic": "CAP Theorem",
        "responses": ["**CAP Theorem** — a distributed system can only guarantee 2 of 3:\n\n1. **Consistency:** Every read gets the latest write\n2. **Availability:** Every request gets a response\n3. **Partition Tolerance:** System works despite network failures\n\n**In practice** (partitions always happen):\n- **CP:** Consistent but may be unavailable (MongoDB, HBase)\n- **AP:** Available but may be inconsistent (Cassandra, DynamoDB)\n- **CA:** Only in single-node (traditional RDBMS)\n\n**Eventual Consistency:** AP systems converge to consistent state over time."]
    },

    # ===================== WEB DEV =====================
    {
        "patterns": ["html", "css", "javascript", "web development", "frontend", "react", "dom"],
        "topic": "Web Development",
        "responses": ["**Web Dev** stack:\n\n**Frontend:**\n- **HTML:** Structure\n- **CSS:** Styling (Flexbox, Grid, Animations)\n- **JavaScript:** Interactivity\n- **Frameworks:** React, Vue, Angular\n\n**Backend:**\n- **Node.js** (Express), **Python** (Flask/Django/FastAPI), **Java** (Spring)\n\n**Key concepts:**\n- DOM manipulation\n- Event handling\n- Async/Await, Promises\n- REST APIs\n- State management\n\nWhat web dev topic do you want to explore?"]
    },

    # ===================== GIT =====================
    {
        "patterns": ["git", "github", "version control", "commit", "branch", "merge", "pull request", "rebase"],
        "topic": "Git & Version Control",
        "responses": ["**Git** essential commands:\n\n```bash\ngit init                    # Initialize repo\ngit add .                   # Stage all changes\ngit commit -m 'message'     # Commit\ngit branch feature          # Create branch\ngit checkout feature        # Switch branch\ngit merge feature           # Merge into current\ngit pull origin main        # Fetch + merge remote\ngit push origin main        # Push to remote\ngit log --oneline -5        # View last 5 commits\ngit stash                   # Temporarily save changes\n```\n\n**Merge vs Rebase:**\n- Merge: Creates merge commit, preserves history\n- Rebase: Linear history, cleaner but rewrites commits\n\nNeed help with a specific Git scenario?"]
    },

    # ===================== MATH =====================
    {
        "patterns": ["math", "discrete math", "probability", "combinatorics", "modular arithmetic", "gcd", "prime"],
        "topic": "Math for CS",
        "responses": ["**Math for competitive programming:**\n\n**Number Theory:**\n- GCD: `math.gcd(a, b)` — Euclidean algorithm\n- Prime check: Trial division O(√n)\n- Sieve of Eratosthenes: All primes up to N in O(N log log N)\n- Modular exponentiation: `pow(base, exp, mod)`\n\n**Combinatorics:**\n- nCr = n! / (r! × (n-r)!)\n- Catalan numbers, Fibonacci, Pascal's triangle\n\n**Probability:**\n- P(A∪B) = P(A) + P(B) - P(A∩B)\n- Bayes' theorem, Expected value\n\n```python\nfrom math import gcd, factorial\ndef nCr(n, r): return factorial(n) // (factorial(r) * factorial(n-r))\n```"]
    },

    # ===================== COMPLEXITY =====================
    {
        "patterns": ["big o", "time complexity", "space complexity", "complexity", "performance", "optimize"],
        "topic": "Complexity Analysis",
        "responses": ["**Big O cheat sheet:**\n\n| Complexity | Name | Example |\n|-----------|------|----------|\n| O(1) | Constant | Hash lookup |\n| O(log n) | Logarithmic | Binary search |\n| O(n) | Linear | Single loop |\n| O(n log n) | Linearithmic | Merge sort |\n| O(n²) | Quadratic | Nested loops |\n| O(2ⁿ) | Exponential | Subsets |\n| O(n!) | Factorial | Permutations |\n\n**Rules of thumb:**\n- n ≤ 10: O(n!) ok\n- n ≤ 1000: O(n²)\n- n ≤ 10⁶: O(n log n)\n- n ≤ 10⁸: O(n) or O(log n)"]
    },

    # ===================== LANGUAGES =====================
    {
        "patterns": ["python", "python3", "list comprehension", "lambda", "decorator"],
        "topic": "Python",
        "responses": ["**Python** tips:\n\n```python\n# Essential imports\nfrom collections import Counter, defaultdict, deque\nfrom heapq import heappush, heappop\nfrom bisect import bisect_left\nfrom functools import lru_cache\n\n# List comprehension\nsquares = [x**2 for x in range(10)]\n\n# Lambda + sort\narr.sort(key=lambda x: -x[1])\n\n# Decorator\ndef timer(func):\n    def wrapper(*args):\n        import time; start = time.time()\n        result = func(*args)\n        print(f'{time.time()-start:.3f}s')\n        return result\n    return wrapper\n```\n\nWhat Python concept do you need?"]
    },
    {
        "patterns": ["c++", "cpp", "stl", "vector", "iostream"],
        "topic": "C++",
        "responses": ["**C++ STL** essentials:\n\n```cpp\n#include <bits/stdc++.h>\nusing namespace std;\n\nvector<int> v = {3,1,2};\nsort(v.begin(), v.end());       // {1,2,3}\n\nset<int> s = {1,2,3};           // sorted unique\nmap<string,int> m;              // sorted key-value\nunordered_map<string,int> um;   // hash map O(1)\npriority_queue<int> pq;         // max-heap\npriority_queue<int,vector<int>,greater<int>> minpq; // min-heap\n\n// Fast I/O\nios_base::sync_with_stdio(false);\ncin.tie(NULL);\n```"]
    },
    {
        "patterns": ["java", "arraylist", "hashmap java", "spring"],
        "topic": "Java",
        "responses": ["**Java** essentials:\n\n```java\n// Collections\nArrayList<Integer> list = new ArrayList<>();\nHashMap<String,Integer> map = new HashMap<>();\nPriorityQueue<Integer> pq = new PriorityQueue<>();\nTreeMap<String,Integer> tm = new TreeMap<>(); // sorted\n\n// Streams (Java 8+)\nlist.stream()\n    .filter(x -> x > 5)\n    .map(x -> x * 2)\n    .sorted()\n    .collect(Collectors.toList());\n\n// Lambda\nCollections.sort(list, (a,b) -> b - a); // descending\n```\n\n**Java vs C++:** Java has garbage collection, no pointers, safer but slightly slower."]
    },

    # ===================== SOFT SKILLS =====================
    {
        "patterns": ["stuck", "hard", "difficult", "confused", "frustrated", "struggling", "can't", "don't understand", "give up"],
        "topic": "Motivation",
        "responses": ["It's totally normal to feel stuck — every programmer has been there! 💪\n\n**My advice:**\n1. **Break it down** — What's the smallest part you understand?\n2. **Draw it out** — Visualize with examples on paper\n3. **Brute force first** — Get any solution working, optimize later\n4. **Rubber duck it** — Explain the problem out loud\n5. **Take a break** — 5 min walk can bring clarity\n\n**Remember:** Struggling = learning. Every expert was once a beginner.\n\nTell me the specific concept and I'll break it down step by step!"]
    },
    {
        "patterns": ["approach", "solve", "strategy", "how to", "step by step", "plan", "technique"],
        "topic": "Problem Solving",
        "responses": ["**5-step problem-solving framework:**\n\n1. **Understand** — Read carefully. Inputs? Outputs? Constraints?\n2. **Examples** — Work 2-3 by hand\n3. **Brute Force** — Simplest solution first\n4. **Optimize** — Can you use a HashMap? Sorting? DP? Two pointers?\n5. **Code & Test** — Clean code, then test edge cases\n\n**Pattern recognition:**\n- \"Find pair/subarray\" → Two pointers / HashMap\n- \"Min/max\" → Binary search on answer / DP\n- \"All permutations/subsets\" → Backtracking\n- \"Shortest path\" → BFS / Dijkstra\n- \"Overlapping subproblems\" → DP\n- \"Optimal substructure\" → Greedy or DP\n\nWhat problem are you solving?"]
    },
    {
        "patterns": ["interview", "interview prep", "coding interview", "technical interview", "faang", "placement"],
        "topic": "Interview Prep",
        "responses": ["**Coding Interview Prep** roadmap:\n\n**Phase 1 — Foundations (2 weeks):**\nArrays, Strings, Hash Maps, Two Pointers, Sliding Window\n\n**Phase 2 — Core (3 weeks):**\nLinked Lists, Stacks, Queues, Trees, Binary Search, Sorting\n\n**Phase 3 — Advanced (3 weeks):**\nGraphs (BFS/DFS), DP, Backtracking, Heaps, Tries\n\n**Phase 4 — System Design (2 weeks):**\nLoad balancing, Caching, Database design, Scalability\n\n**Tips:**\n- Solve 150-200 problems on the Practice Hub\n- Focus on patterns, not memorization\n- Practice explaining your thought process\n- Time yourself: 20-30 min per medium problem\n\nWant me to suggest practice problems for any phase?"]
    },
    {
        "patterns": ["loop", "for loop", "while loop", "iteration", "infinite loop"],
        "topic": "Loops",
        "responses": ["**Loops** repeat code.\n\n```python\nfor i in range(10): print(i)     # known count\nwhile condition: do_something()  # until false\n```\n\n`break` = exit, `continue` = skip, nested = O(n²)"]
    },
]

def _tokenize(text):
    text = text.lower()
    text = re.sub(r'[^\w\s]', ' ', text)
    return [w for w in text.split() if len(w) > 1]

def _knowledge_base_response(user_message):
    """Fallback: match against knowledge base."""
    message_lower = user_message.lower()
    query_tokens = _tokenize(user_message)

    if not query_tokens:
        return "I didn't catch that. Try asking about arrays, sorting, or dynamic programming!"

    best_entry = None
    best_score = 0

    for entry in KNOWLEDGE_BASE:
        score = 0
        for pattern in entry["patterns"]:
            if ' ' in pattern:
                if pattern in message_lower:
                    score += 5.0
            else:
                if pattern in message_lower:
                    score += 3.0
                elif pattern in query_tokens:
                    score += 2.0

        for qt in query_tokens:
            for pattern in entry["patterns"]:
                if ' ' not in pattern and qt != pattern and len(qt) > 3 and len(pattern) > 2:
                    if qt.startswith(pattern) or pattern.startswith(qt):
                        score += 1.5

        normalized = score / (len(entry["patterns"]) + 1)
        if normalized > best_score:
            best_score = normalized
            best_entry = entry

    if best_entry and best_score > 0.2:
        return random.choice(best_entry["responses"])

    # Greetings
    if any(w in message_lower for w in ["hello", "hi", "hey", "good morning"]):
        return "Hey there! 👋 I'm Learnify Buddy.\n\nI can help with:\n- **Data Structures** (arrays, trees, graphs)\n- **Algorithms** (sorting, DP, greedy)\n- **Programming** (Python, C++, Java)\n- **Problem-solving strategies**\n\nWhat would you like to learn?"

    if any(w in message_lower for w in ["thanks", "thank you", "thx"]):
        return "You're welcome! 😊 Keep practicing!"

    if any(p in message_lower for p in ["what can you", "who are you"]):
        return "I'm **Learnify Buddy** — your AI CS tutor! 🤖 I know DSA, Python, C++, Java, and problem-solving. Just ask!"

    return "I can help with CS topics! Try:\n- 'Explain dynamic programming'\n- 'What is a binary search tree?'\n- 'Compare sorting algorithms'\n\nWhat interests you?"
