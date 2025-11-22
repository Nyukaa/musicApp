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

    // "C4" -> "c/4"
    // const vexNotes = notes.map((n) => {
    //   return new VF.StaveNote({
    //     keys: [n.pitch.replace(/(\d)/, "/$1").toLowerCase()],
    //     duration: n.duration,
    //   });
    // });

    const vexNotes = notes.map((n) => {
      //"C#4", "Bb3", "F4"
      const match = n.pitch.match(/^([A-Ga-g])([#b]?)(\d)$/);
      if (!match) {
        console.warn("Invalid pitch format:", n.pitch);
        return new VF.StaveNote({ keys: ["c/4"], duration: "q" });
      }

      const [, note, accidental, octave] = match;
      const key = note.toLowerCase() + accidental + "/" + octave;
      const staveNote = new VF.StaveNote({
        keys: [key],
        duration: n.duration,
      });
      if (accidental) {
        staveNote.addModifier(new VF.Accidental(accidental));
      }

      return staveNote;
    });

    // Highlight current note
    vexNotes[currentIndex].setStyle({
      fillStyle: "green",
      strokeStyle: "green",
    });

    VF.Formatter.FormatAndDraw(context, stave, vexNotes);
  }, [notes, currentIndex]);

  return <div ref={container}></div>;
}
