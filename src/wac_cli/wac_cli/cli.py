import os
import sys
import argparse
import subprocess
from pathlib import Path

# Resolve repo root. Since this file is in src/wac_cli/wac_cli/cli.py,
# the repo root is 4 parents up.
WAC_ROOT = Path(__file__).resolve().parent.parent.parent.parent

def _wac_dir(level: str, phase: str) -> Path:
    try:
        p_val = int(phase)
        p_str = f"{p_val:02d}"
    except ValueError:
        p_str = phase

    level_dir = WAC_ROOT / f"level-{level}"
    if not level_dir.exists():
        print(f"Error: Level directory {level_dir} does not exist.", file=sys.stderr)
        sys.exit(1)

    for path in level_dir.iterdir():
        if path.is_dir() and path.name.startswith(f"{p_str}-"):
            return path

    print(f"Error: No phase {phase} found in level {level}.", file=sys.stderr)
    sys.exit(1)

def _wac_starter(level: str, phase: str) -> Path:
    phase_dir = _wac_dir(level, phase)
    starter_dir = phase_dir / "starter"
    return starter_dir if starter_dir.is_dir() else phase_dir

def _wac_exec(dir_path: Path):
    os.chdir(dir_path)
    
    if (dir_path / "exercises.sh").exists():
        print("# This phase is meant to be run one block at a time.")
        print("# Open exercises.sh and run each block individually. Running all now:\n")
        subprocess.run(["bash", "exercises.sh"])
    elif (dir_path / "index.html").exists():
        print("Serving current directory at http://localhost:8080   (Ctrl-C to stop)")
        subprocess.run([sys.executable, "-m", "http.server", "8080"])
    elif (dir_path / "pyproject.toml").exists():
        print("Package phase. Set up once:   pip install -e \".[dev]\"")
        print("Then:   pytest      |      python -m weather.cli Roseau")
    else:
        py_files = sorted(list(dir_path.glob("*.py")))
        if py_files:
            main_py = py_files[0]
            print(f"$ python3 {main_py.name}")
            subprocess.run([sys.executable, main_py.name])
        elif (dir_path / "README.md").exists():
            print("No runnable code in this phase — showing its README:\n")
            print((dir_path / "README.md").read_text(encoding="utf-8"))
        else:
            print("Nothing obvious to run. Files here:")
            for f in dir_path.iterdir():
                if f.name != ".DS_Store":
                    print(f"  {f.name}")

def cmd_path(args):
    print(_wac_starter(args.level, args.phase))

def cmd_open(args):
    starter = _wac_starter(args.level, args.phase)
    editor = os.environ.get("EDITOR", "vi")
    subprocess.run([editor, str(starter)])

def cmd_run(args):
    starter = _wac_starter(args.level, args.phase)
    _wac_exec(starter)

def cmd_solution(args):
    phase_dir = _wac_dir(args.level, args.phase)
    sol_dir = phase_dir / "solution"
    
    if sol_dir.is_dir():
        output = []
        # Find all files recursively, skip __pycache__
        for path in sorted(sol_dir.rglob("*")):
            if path.is_file() and "__pycache__" not in path.parts:
                rel_path = path.relative_to(WAC_ROOT)
                output.append(f"===== {rel_path} =====")
                try:
                    output.append(path.read_text(encoding="utf-8"))
                except Exception as e:
                    output.append(f"[Could not read file: {e}]")
                output.append("")
        
        pager = os.environ.get("PAGER", "cat")
        # Simple pager implementation or print
        full_text = "\n".join(output)
        if pager == "cat":
            print(full_text)
        else:
            p = subprocess.Popen([pager], stdin=subprocess.PIPE, text=True)
            p.communicate(input=full_text)
    else:
        readme = phase_dir / "README.md"
        if readme.is_file():
            print("No solution/ here. Showing README:\n")
            print(readme.read_text(encoding="utf-8"))
        else:
            print("No solution or README found.", file=sys.stderr)

def cmd_test(args):
    test_dir = WAC_ROOT / "level-2/01-python-structure/solution"
    if not test_dir.exists():
        print(f"Error: Test directory {test_dir} not found.", file=sys.stderr)
        sys.exit(1)
    
    os.chdir(test_dir)
    subprocess.run([sys.executable, "-m", "pytest", "-q"])

def cmd_serve(args):
    port = args.port or "8080"
    print(f"Course site -> http://localhost:{port}   (Ctrl-C to stop)")
    os.chdir(WAC_ROOT)
    subprocess.run([sys.executable, "-m", "http.server", port])

def cmd_list(args):
    for L in ["1", "2"]:
        print(f"Level {L}:")
        level_dir = WAC_ROOT / f"level-{L}"
        if level_dir.is_dir():
            for path in sorted(level_dir.iterdir()):
                if path.is_dir() and not path.name.startswith("."):
                    print(f"  {L} {path.name}")

def main():
    parser = argparse.ArgumentParser(
        description="wac — Weather API Course CLI helper (Python Edition)",
        add_help=False
    )
    
    # We want to emulate the command style of the original bash tool: `wac <command> [args]`
    subparsers = parser.add_subparsers(dest="command")
    
    # Help command
    parser_help = subparsers.add_parser("help", add_help=False)
    
    # Path command
    parser_path = subparsers.add_parser("path", add_help=False)
    parser_path.add_argument("level")
    parser_path.add_argument("phase")
    parser_path.set_defaults(func=cmd_path)
    
    # Open command
    parser_open = subparsers.add_parser("open", add_help=False)
    parser_open.add_argument("level")
    parser_open.add_argument("phase")
    parser_open.set_defaults(func=cmd_open)
    
    # Run command
    parser_run = subparsers.add_parser("run", add_help=False)
    parser_run.add_argument("level")
    parser_run.add_argument("phase")
    parser_run.set_defaults(func=cmd_run)
    
    # Solution command
    parser_sol = subparsers.add_parser("solution", add_help=False)
    parser_sol.add_argument("level")
    parser_sol.add_argument("phase")
    parser_sol.set_defaults(func=cmd_solution)
    
    # Alias sol
    parser_sol_alias = subparsers.add_parser("sol", add_help=False)
    parser_sol_alias.add_argument("level")
    parser_sol_alias.add_argument("phase")
    parser_sol_alias.set_defaults(func=cmd_solution)
    
    # Test command
    parser_test = subparsers.add_parser("test", add_help=False)
    parser_test.set_defaults(func=cmd_test)
    
    # Serve command
    parser_serve = subparsers.add_parser("serve", add_help=False)
    parser_serve.add_argument("port", nargs="?", default="8080")
    parser_serve.set_defaults(func=cmd_serve)
    
    # List command
    parser_list = subparsers.add_parser("list", add_help=False)
    parser_list.set_defaults(func=cmd_list)
    
    # Alias ls
    parser_ls = subparsers.add_parser("ls", add_help=False)
    parser_ls.set_defaults(func=cmd_list)

    # Simple routing
    if len(sys.argv) < 2:
        print_help()
        sys.exit(0)
        
    cmd = sys.argv[1]
    if cmd in ["help", "-h", "--help"]:
        print_help()
        sys.exit(0)

    try:
        args = parser.parse_args()
    except SystemExit:
        print_help()
        sys.exit(1)
        
    if not args.command or not hasattr(args, "func"):
        print_help()
        sys.exit(1)
        
    args.func(args)

def print_help():
    help_text = """wac — Weather API Course helper

  wac cd   <level> <phase>       cd into the phase's starter folder (handled by wrapper)
  wac run  <level> <phase>       run the starter in its folder
  wac open <level> <phase>       open the starter in $EDITOR
  wac solution <level> <phase>   print the solution file(s)
  wac path <level> <phase>       print the starter path
  wac test                       run the Level 2 Phase 01 tests
  wac serve [port]               serve the course site (default 8080)
  wac list                       list all phases
  wac help                       show this help

  <level> = 1 or 2,  <phase> = 0-7      e.g.  wac cd 1 00    wac run 1 01"""
    print(help_text)

if __name__ == "__main__":
    main()
