import "./style.css";

import { Game } from "./_modules";
import * as Scenes from "./_scenes";

Game.run((manager) => {
  manager.register(Scenes.Scene_Test, "57fe0d3ee1b34399b464053e459eb18d");
  manager.register(Scenes.Scene_Particle, "841e5a91ffaf4432b3db034b520a2d52");
});
