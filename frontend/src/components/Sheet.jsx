import { useEffect, useRef } from "react";
import Vex from "vexflow";

export default function Sheet({ notes, currentIndex }) {
  const container = useRef(null);

  useEffect(() => {
    if (!notes || notes.length === 0) return;
    container.current.innerHTML = "";

    const VF = Vex;
    const renderer = new VF.Renderer(
      container.current,
      VF.Renderer.Backends.SVG
    );

    renderer.resize(450, 200);
    const context = renderer.getContext();
    const stave = new VF.Stave(10, 40, 400);

    stave.addClef("treble").setContext(context).draw();

    // превращаем "C4" -> "c/4"
    const vexNotes = notes.map((n) => {
      return new VF.StaveNote({
        keys: [n.pitch.replace(/(\d)/, "/$1").toLowerCase()],
        duration: n.duration,
      });
    });

    vexNotes[currentIndex].setStyle({
      fillStyle: "green",
      strokeStyle: "green",
    });

    VF.Formatter.FormatAndDraw(context, stave, vexNotes);
  }, [notes, currentIndex]);

  return <div ref={container}></div>;
}
