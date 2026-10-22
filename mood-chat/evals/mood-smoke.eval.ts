import { defineEval, includes } from "@cursor/bdk/evals";

export default defineEval({
  tags: ["smoke"],
  cases: [
    {
      id: "clear-negative",
      description:
        "A clearly frustrated message gets a successful turn with a mood label.",
      async test(t) {
        await t.send(
          "Ugh, I am so frustrated — everything keeps breaking and I am stuck.",
        );
        t.succeeded();
        t.check(t.reply, includes(/Mood:\s*(negative|tense)/i));
      },
    },
  ],
});
