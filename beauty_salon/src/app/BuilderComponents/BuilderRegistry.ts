"use client";
import { Builder } from "@builder.io/react";
import { Heading, MyInput } from "./CustomComponent";

Builder.registerComponent(Heading, {
  name: "Heading",
  inputs: [{ name: "content", type: "text" }],
  image:
    "https://tabler-icons.io/static/tabler-icons/icons-png/3d-cube-sphere-off.png",
});

Builder.registerComponent(MyInput, {
  name: "Input",
  inputs: [
    { name: "name", type: "text" },
    { name: "type", type: "text" },
    { name: "placeholder", type: "text" },
  ],
  image:
    "https://tabler-icons.io/static/tabler-icons/icons-png/3d-cube-sphere-off.png",
});
