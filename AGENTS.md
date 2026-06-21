# Instructions
- For all tasks, use subagents whenever possible to optimize use of context and minimize unnecessary context in the main (orchestrator) conversation. Use subagents in parallel whenever possible as well to increase efficiency of completing tasks.
- Use the superpowers skill for all tasks.
- Test all newly-implemented features using a live browser via Playwright MCP.
- Subagents must always be the same model and thinking level as the orchestrator agent.
- On intelligence pages, popups must not show a "Parsed markdown" or similar button; any PDF button must be labeled "View PDF" and link to the NASP website URL, not a local or parsed artifact.
