import os
import re
import json
from datetime import datetime

class CurriculumParser:
    def __init__(self, root_dir):
        self.root_dir = root_dir
        self.curriculum = []

    def parse_markdown_table(self, table_text, relative_dir=""):
        """Parses an OSSU course/book table with flexible columns."""
        courses = []
        lines = [l.strip() for l in table_text.strip().split('\n') if l.strip()]
        if len(lines) < 3: return []
        
        # Identify column headers
        headers = [h.strip() for h in lines[0].split('|') if h.strip()]
        
        # Skip header and separator
        for line in lines[2:]:
            if '|' not in line: continue
            parts = [p.strip() for p in line.split('|') if p.strip()]
            if not parts: continue
            
            # Title and Link: [Title](link)
            first_col = parts[0]
            title_match = re.search(r'\[(.*?)\]\((.*?)\)', first_col)
            if title_match:
                title = title_match.group(1)
                link = title_match.group(2)
                # Resolve relative links
                if not link.startswith('http') and relative_dir:
                    link = os.path.join(relative_dir, link)
            else:
                title = first_col
                link = "#"

            # Check if this is a book table or course table
            is_book = "Author" in "".join(headers)
            
            if is_book:
                author = parts[1] if len(parts) > 1 else "Unknown"
                courses.append({
                    "title": title,
                    "link": link,
                    "author": author,
                    "type": "book"
                })
            else:
                duration = parts[1] if len(parts) > 1 else "-"
                effort = parts[2] if len(parts) > 2 else "-"
                courses.append({
                    "title": title,
                    "link": link,
                    "duration": duration,
                    "effort": effort,
                    "type": "course"
                })
        return courses

    def parse_main_track(self):
        """Parses the main README.md for the core tracks."""
        path = os.path.join(self.root_dir, "README.md")
        if not os.path.exists(path): return []
        
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()

        sections = re.split(r'\n## ', content)
        track = {"title": "Main Curriculum", "categories": []}

        for section in sections:
            lines = section.split('\n')
            title = lines[0].strip()
            
            if any(x in title.lower() for x in ["contents", "summary", "community", "conduct", "team", "congratulations", "prerequisites"]):
                continue

            subsections = re.split(r'\n### ', section)
            if len(subsections) > 1:
                category = {"title": title, "subcategories": []}
                for sub in subsections[1:]:
                    sub_lines = sub.split('\n')
                    sub_title = sub_lines[0].strip()
                    # More flexible table regex
                    table_match = re.search(r'(\|.*\|.*\|.*?)\n\n', sub, re.DOTALL)
                    if not table_match:
                        table_match = re.search(r'(\|.*\|.*\|.*)', sub, re.DOTALL)
                    
                    if table_match:
                        courses = self.parse_markdown_table(table_match.group(1))
                        category["subcategories"].append({
                            "title": sub_title,
                            "courses": courses
                        })
                if category["subcategories"]:
                    track["categories"].append(category)
            else:
                table_match = re.search(r'(\|.*\|.*\|.*?)\n\n', section, re.DOTALL)
                if not table_match:
                    table_match = re.search(r'(\|.*\|.*\|.*)', section, re.DOTALL)
                
                if table_match:
                    courses = self.parse_markdown_table(table_match.group(1))
                    track["categories"].append({
                        "title": title,
                        "subcategories": [{"title": "General", "courses": courses}]
                    })
        
        return track

    def parse_intro_programming(self):
        """Parses coursepages/intro-programming/README.md."""
        path = os.path.join(self.root_dir, "coursepages/intro-programming/README.md")
        if not os.path.exists(path): return None
        
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()

        track = {"title": "Intro to Programming", "categories": [{"title": "Foundation", "subcategories": []}]}
        sections = re.split(r'\n## ', content)
        
        for section in sections[1:]: 
            lines = section.split('\n')
            title = lines[0].strip()
            link_match = re.search(r'\*\*Link\*\*: <(.*?)>', section)
            
            if link_match:
                track["categories"][0]["subcategories"].append({
                    "title": title,
                    "courses": [{
                        "title": title,
                        "link": link_match.group(1),
                        "duration": "Self-paced",
                        "effort": "-",
                        "type": "course"
                    }]
                })
        
        return track

    def parse_extras(self, filename, title_prefix):
        """Parses files in the extras directory."""
        path = os.path.join(self.root_dir, "extras", filename)
        if not os.path.exists(path): return None
        
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()

        track = {"title": title_prefix, "categories": []}
        sections = re.split(r'\n## ', content)
        
        for section in sections[1:]:
            lines = section.split('\n')
            title = lines[0].strip()
            
            # Check for tables (flexible columns)
            table_match = re.search(r'(\|.*\|.*?)\n\n', section, re.DOTALL)
            if not table_match:
                 table_match = re.search(r'(\|.*\|.*)', section, re.DOTALL)
            
            if table_match:
                courses = self.parse_markdown_table(table_match.group(1))
                if courses:
                    track["categories"].append({
                        "title": title,
                        "subcategories": [{"title": "Items", "courses": courses}]
                    })
            else:
                # Fallback to list format
                links = re.findall(r'- \[(.*?)\]\((.*?)\)', section)
                if links:
                    courses = [{
                        "title": l[0],
                        "link": l[1],
                        "duration": "Reading",
                        "effort": "-",
                        "type": "book"
                    } for l in links]
                    track["categories"].append({
                        "title": title,
                        "subcategories": [{"title": "Readings", "courses": courses}]
                    })
        
        return track

    def build_all(self, output_path):
        all_tracks = []
        
        intro = self.parse_intro_programming()
        if intro: all_tracks.append(intro)
        
        main = self.parse_main_track()
        if main: all_tracks.append(main)
        
        extras = self.parse_extras("courses.md", "Electives (Great Courses)")
        if extras: all_tracks.append(extras)
        
        readings = self.parse_extras("readings.md", "Recommended Books")
        if readings: all_tracks.append(readings)

        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(all_tracks, f, indent=4)
        
        print(f"Successfully expanded OSSU curriculum into {output_path}")

if __name__ == "__main__":
    parser = CurriculumParser("/Users/anonymous-kun/Desktop/probstatement/csdp")
    parser.build_all("/Users/anonymous-kun/Desktop/probstatement/src/data/curriculum.json")
