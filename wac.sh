#!/usr/bin/env bash
# wac — Weather API Course CLI helper.
#
# Source it (recommended) so `wac cd` can change your shell's directory:
#
#     source /path/to/weather-api-course/wac.sh
#
# Add that line to ~/.zshrc (or ~/.bashrc) to make it permanent. You can then
# work any phase without typing long paths:
#
#     wac cd   <level> <phase>       cd into that phase's starter folder
#     wac run  <level> <phase>       run the starter in its folder
#     wac open <level> <phase>       open the starter in $EDITOR
#     wac solution <level> <phase>   print the solution file(s)
#     wac path <level> <phase>       print the starter path
#     wac test                       run the Level 2 Phase 01 test suite
#     wac serve [port]               serve the course site (default 8080)
#     wac list                       list all phases
#     wac help                       show this help
#
# <level> is 1 or 2.  <phase> is 0-7 (e.g. 00, 4, 07).
# Examples:   wac cd 1 00     wac run 1 01     wac solution 2 04

# Resolve the repo root once, whether sourced or executed, in bash or zsh.
if [ -n "${ZSH_VERSION:-}" ]; then
  WAC_ROOT="${${(%):-%x}:A:h}"
else
  WAC_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" >/dev/null 2>&1 && pwd)"
fi

_wac_dir() {            # <level> <phase> -> phase dir (absolute) on stdout
  local L="$1" P="$2" d
  [ "${#P}" -eq 1 ] && P="0$P"
  d=$(find "$WAC_ROOT/level-$L" -maxdepth 1 -type d -name "$P-*" 2>/dev/null | head -n1)
  [ -n "$d" ] && { printf '%s' "$d"; return 0; }
  return 1
}

_wac_starter() {        # <level> <phase> -> starter dir (or phase dir) on stdout
  local d; d=$(_wac_dir "$1" "$2") || return 1
  if [ -d "$d/starter" ]; then printf '%s' "$d/starter"; else printf '%s' "$d"; fi
}

_wac_help() {
  cat <<'EOF'
wac — Weather API Course helper

  wac cd   <level> <phase>       cd into the phase's starter folder
  wac run  <level> <phase>       run the starter in its folder
  wac open <level> <phase>       open the starter in $EDITOR
  wac solution <level> <phase>   print the solution file(s)
  wac path <level> <phase>       print the starter path
  wac test                       run the Level 2 Phase 01 tests
  wac serve [port]               serve the course site (default 8080)
  wac list                       list all phases
  wac help                       show this help

  <level> = 1 or 2,  <phase> = 0-7      e.g.  wac cd 1 00    wac run 1 01
EOF
}

_wac_exec() {           # run the obvious thing in the current directory
  if [ -f exercises.sh ]; then
    echo "# This phase is meant to be run one block at a time."
    echo "# Open exercises.sh and run each block individually. Running all now:"
    echo
    bash exercises.sh
  elif [ -f index.html ]; then
    echo "Serving $(pwd) at http://localhost:8080   (Ctrl-C to stop)"
    python3 -m http.server 8080
  elif [ -f pyproject.toml ]; then
    echo "Package phase. Set up once:   pip install -e \".[dev]\""
    echo "Then:   pytest      |      python -m weather.cli Roseau"
  else
    local main
    main=$(ls -1 *.py 2>/dev/null | head -n1)
    if [ -n "$main" ]; then
      echo "\$ python3 $main"
      python3 "$main"
    elif [ -f README.md ]; then
      echo "No runnable code in this phase — showing its README:"
      echo
      cat README.md
    else
      echo "Nothing obvious to run. Files here:"; ls -1
    fi
  fi
}

wac() {
  local cmd="${1:-help}"
  [ "$#" -gt 0 ] && shift
  case "$cmd" in
    cd)
      local d; d=$(_wac_starter "$1" "$2") || { echo "wac: no phase $1/$2" >&2; return 1; }
      cd "$d" && echo "-> ${d#"$WAC_ROOT"/}"
      ;;
    path)
      local d; d=$(_wac_starter "$1" "$2") || { echo "wac: no phase $1/$2" >&2; return 1; }
      printf '%s\n' "$d"
      ;;
    open)
      local d; d=$(_wac_starter "$1" "$2") || { echo "wac: no phase $1/$2" >&2; return 1; }
      "${EDITOR:-vi}" "$d"
      ;;
    run)
      local d; d=$(_wac_starter "$1" "$2") || { echo "wac: no phase $1/$2" >&2; return 1; }
      ( cd "$d" && _wac_exec )
      ;;
    solution|sol)
      local d; d=$(_wac_dir "$1" "$2") || { echo "wac: no phase $1/$2" >&2; return 1; }
      if [ -d "$d/solution" ]; then
        {
          local f
          find "$d/solution" -type f -not -path '*/__pycache__/*' 2>/dev/null | sort | while IFS= read -r f; do
            echo "===== ${f#"$WAC_ROOT"/} ====="
            cat "$f"; echo
          done
        } | ${PAGER:-cat}
      else
        { echo "No solution/ here. Showing README:"; echo; cat "$d/README.md" 2>/dev/null; } | ${PAGER:-cat}
      fi
      ;;
    test)
      ( cd "$WAC_ROOT/level-2/01-python-structure/solution" && python3 -m pytest -q )
      ;;
    serve)
      local port="${1:-8080}"
      echo "Course site -> http://localhost:$port   (Ctrl-C to stop)"
      ( cd "$WAC_ROOT" && python3 -m http.server "$port" )
      ;;
    list|ls)
      local L d name
      for L in 1 2; do
        echo "Level $L:"
        for d in "$WAC_ROOT"/level-"$L"/*/; do
          [ -d "$d" ] || continue
          name=$(basename "$d")
          printf "  %s %s\n" "$L" "$name"
        done
      done
      ;;
    help|-h|--help) _wac_help ;;
    *) echo "wac: unknown command '$cmd'" >&2; _wac_help; return 1 ;;
  esac
}

# If this file was executed (not sourced), dispatch directly. `wac cd` only
# changes your shell when the file is sourced.
_wac_sourced=0
if [ -n "${ZSH_VERSION:-}" ]; then
  case "${ZSH_EVAL_CONTEXT:-}" in *:file*) _wac_sourced=1 ;; esac
elif [ -n "${BASH_VERSION:-}" ]; then
  [ "${BASH_SOURCE[0]}" != "$0" ] && _wac_sourced=1
fi
[ "$_wac_sourced" -eq 0 ] && wac "$@"
unset _wac_sourced
