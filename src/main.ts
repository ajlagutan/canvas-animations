import "./scss/style.scss";

import * as app from "@app";
import { SceneManager } from "@lib";

SceneManager.run(
  {
    id: "801f682c058c486a84515d8c6ca335a0",
    scene: app.SceneTest,
    title: "test scene",
  },
  {
    id: "d8a44ee98daa4fed9ba76b67e5849a7c",
    scene: app.SceneParticle1,
    title: "particle 1",
  },
  {
    id: "76ece81397ee442aa2b07ee2ab76bb5a",
    scene: app.SceneParticle2,
  },
);
