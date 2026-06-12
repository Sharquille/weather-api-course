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

# Locate Python CLI script directly
WAC_CLI_PY="$WAC_ROOT/src/wac_cli/wac_cli/cli.py"

wac() {
  local cmd="${1:-help}"
  if [ "$cmd" = "cd" ]; then
    # Resolve starter path via Python CLI, then cd into it
    local d; d=$(python3 "$WAC_CLI_PY" path "$2" "$3") || return 1
    cd "$d" && echo "-> ${d#"$WAC_ROOT"/}"
  else
    python3 "$WAC_CLI_PY" "$@"
  fi
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
