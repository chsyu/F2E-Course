import { githubChannel } from "@cursor/bdk/channels/github";

/**
 * GitHub channel is wired for later event hooks.
 * First smoke is playground / `bdk run`; hooks stay no-ops until hillclimb.
 */
export default githubChannel({
  botName: "mood-chat",
  cursorAccount: true,
  onPullRequest: () => null,
  onComment: () => null,
});
