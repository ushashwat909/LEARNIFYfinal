import os
import json
import subprocess
import tempfile
import time
from typing import List, Dict, Optional

class PracticeEngine:
    def __init__(self, problems_dir: str):
        self.problems_dir = problems_dir
        self.problems_index = {}
        self.load_problems()

    def load_problems(self):
        """Indexes all problems found in the problems directory."""
        if not os.path.exists(self.problems_dir):
            print(f"Warning: Problems directory {self.problems_dir} not found.")
            return

        for folder in os.listdir(self.problems_dir):
            path = os.path.join(self.problems_dir, folder)
            if os.path.isdir(path):
                meta_path = os.path.join(path, "metadata.json")
                statement_path = os.path.join(path, "statement.md")
                
                if os.path.exists(meta_path):
                    with open(meta_path, 'r') as f:
                        try:
                            meta = json.load(f)
                            # Ensure ID matches folder if missing
                            if 'id' not in meta: meta['id'] = folder
                            
                            # Load statement if exists
                            if os.path.exists(statement_path):
                                with open(statement_path, 'r') as sf:
                                    meta['statement'] = sf.read()
                            
                            self.problems_index[meta['id']] = meta
                        except Exception as e:
                            print(f"Error loading {folder}: {e}")

    def list_problems(self, category: str = None, difficulty: str = None):
        results = list(self.problems_index.values())
        if category:
            results = [p for p in results if p.get('category') == category]
        if difficulty:
            results = [p for p in results if p.get('difficulty') == difficulty]
        
        # Return simplified list for browsing
        return [{
            "id": p['id'],
            "title": p['title'],
            "difficulty": p['difficulty'],
            "category": p.get('category', 'General')
        } for p in results]

    def get_problem(self, problem_id: str):
        return self.problems_index.get(problem_id)

    def run_code(self, problem_id: str, code: str, language: str = "python"):
        """Securely executes code against test cases. Supports python, cpp, java."""
        problem = self.get_problem(problem_id)
        if not problem:
            return {"error": "Problem not found"}

        test_cases = problem.get('testCases', [])

        if language == "python":
            return self._run_python(problem, code, test_cases)
        elif language == "cpp":
            return self._run_cpp(problem, code, test_cases)
        elif language == "java":
            return self._run_java(problem, code, test_cases)
        else:
            return {"status": "error", "stderr": f"Language '{language}' is not supported."}

    def _run_python(self, problem, code, test_cases):
        runner_script = self._generate_python_runner(problem, code, test_cases)
        with tempfile.NamedTemporaryFile(suffix=".py", mode='w', delete=False) as f:
            f.write(runner_script)
            temp_name = f.name
        try:
            start_time = time.time()
            process = subprocess.run(
                ["python3", temp_name], capture_output=True, text=True, timeout=5
            )
            execution_time = (time.time() - start_time) * 1000
            if process.returncode != 0:
                return {"status": "error", "stderr": process.stderr, "stdout": process.stdout}
            try:
                output_json = json.loads(process.stdout.split("---RESULT_START---")[1].split("---RESULT_END---")[0])
                return {"status": "success", "results": output_json, "execution_time": execution_time}
            except:
                return {"status": "error", "stderr": "Could not parse output: " + process.stdout}
        except subprocess.TimeoutExpired:
            return {"status": "error", "stderr": "Execution timed out (5s limit)"}
        except Exception as e:
            return {"status": "error", "stderr": str(e)}
        finally:
            if os.path.exists(temp_name):
                os.remove(temp_name)

    def _run_cpp(self, problem, code, test_cases):
        """Compile and run C++ code."""
        import shutil
        if not shutil.which("g++"):
            return {"status": "error", "stderr": "C++ compiler (g++) is not installed on this system."}

        with tempfile.TemporaryDirectory() as tmpdir:
            src_path = os.path.join(tmpdir, "solution.cpp")
            bin_path = os.path.join(tmpdir, "solution")

            with open(src_path, 'w') as f:
                f.write(code)

            try:
                # Compile
                compile_proc = subprocess.run(
                    ["g++", "-std=c++20", "-o", bin_path, src_path],
                    capture_output=True, text=True, timeout=10
                )
                if compile_proc.returncode != 0:
                    return {"status": "error", "stderr": "Compilation Error:\n" + compile_proc.stderr}

                # Run
                start_time = time.time()
                run_proc = subprocess.run(
                    [bin_path], capture_output=True, text=True, timeout=5
                )
                execution_time = (time.time() - start_time) * 1000

                if run_proc.returncode != 0:
                    return {"status": "error", "stderr": run_proc.stderr}

                return {
                    "status": "success",
                    "results": [{"case": 0, "status": "pass", "output": run_proc.stdout.strip()}],
                    "execution_time": execution_time
                }
            except subprocess.TimeoutExpired:
                return {"status": "error", "stderr": "Execution timed out (5s limit)"}
            except Exception as e:
                return {"status": "error", "stderr": str(e)}

    def _run_java(self, problem, code, test_cases):
        """Compile and run Java code."""
        import shutil
        if not shutil.which("javac"):
            return {"status": "error", "stderr": "Java compiler (javac) is not installed on this system. Install a JDK to enable Java execution."}

        with tempfile.TemporaryDirectory() as tmpdir:
            src_path = os.path.join(tmpdir, "Solution.java")
            with open(src_path, 'w') as f:
                f.write(code)

            try:
                # Compile
                compile_proc = subprocess.run(
                    ["javac", src_path], capture_output=True, text=True, timeout=10
                )
                if compile_proc.returncode != 0:
                    return {"status": "error", "stderr": "Compilation Error:\n" + compile_proc.stderr}

                # Run
                start_time = time.time()
                run_proc = subprocess.run(
                    ["java", "-cp", tmpdir, "Solution"],
                    capture_output=True, text=True, timeout=5
                )
                execution_time = (time.time() - start_time) * 1000

                if run_proc.returncode != 0:
                    return {"status": "error", "stderr": run_proc.stderr}

                return {
                    "status": "success",
                    "results": [{"case": 0, "status": "pass", "output": run_proc.stdout.strip()}],
                    "execution_time": execution_time
                }
            except subprocess.TimeoutExpired:
                return {"status": "error", "stderr": "Execution timed out (5s limit)"}
            except Exception as e:
                return {"status": "error", "stderr": str(e)}


    def _generate_python_runner(self, problem: dict, user_code: str, test_cases: list):
        """Generates a standalone script that runs the user code against cases."""
        func_name = problem.get('functionName', 'solve')
        
        # Basic boilerplate to handle serialization/deserialization for common DSA types
        # Note: In a production app, we'd use more robust type handlers
        return f"""
import json
import traceback

# User Code
{user_code}

def main():
    test_cases = {json.dumps(test_cases)}
    results = []
    
    # Simple Solution instance detection
    try:
        if 'Solution' in globals():
            sol = Solution()
            solve_func = getattr(sol, '{func_name}')
        else:
            solve_func = globals().get('{func_name}')

        if not solve_func:
            print("---RESULT_START---")
            print(json.dumps([{{ "error": "Function '{func_name}' not found" }}]))
            print("---RESULT_END---")
            return

        for i, case in enumerate(test_cases):
            try:
                # Convert string representation of nested lists to real lists if needed
                args = []
                for k, v in case.items():
                    if isinstance(v, str):
                        if (v.startswith('[') or v.startswith('{{')):
                             try: args.append(json.loads(v.replace("'", '"')))
                             except: args.append(v)
                        else:
                             # Try float or int conversion
                             try:
                                 if '.' in v: args.append(float(v))
                                 else: args.append(int(v))
                             except: args.append(v)
                    else:
                        args.append(v)
                
                output = solve_func(*args)
                results.append({{ "case": i, "status": "pass", "output": output }})
            except Exception as e:
                results.append({{ "case": i, "status": "fail", "error": str(e) }})
        
        print("---RESULT_START---")
        print(json.dumps(results))
        print("---RESULT_END---")

    except Exception as e:
        print("---RESULT_START---")
        print(json.dumps([{{ "error": str(e), "trace": traceback.format_exc() }}]))
        print("---RESULT_END---")

if __name__ == "__main__":
    main()
"""

