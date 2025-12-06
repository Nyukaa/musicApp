import { useEffect, useRef } from "react";
import Vex from "vexflow";

export default function Sheet({ notes, currentIndex }) {
  const container = useRef(null);

  useEffect(() => {
    if (!notes || notes.length === 0) return;

    const render = () => {
      const width = container.current.clientWidth || 450;
      const height = Math.max(180, width * 0.35); // немного увеличиваем высоту

      container.current.innerHTML = "";

      const VF = Vex;
      const renderer = new VF.Renderer(
        container.current,
        VF.Renderer.Backends.SVG
      );

      renderer.resize(width, height);
      const context = renderer.getContext();
      const stave = new VF.Stave(10, 40, width - 20);

      stave.addClef("treble").setContext(context).draw();

      const vexNotes = notes.map((n) => {
        const match = n.pitch.match(/^([A-Ga-g])([#b]?)(\d)$/);
        if (!match) {
          console.warn("Invalid pitch:", n.pitch);
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

      // выделить текущую ноту
      if (vexNotes[currentIndex]) {
        vexNotes[currentIndex].setStyle({
          fillStyle: "green",
          strokeStyle: "green",
        });
      }

      VF.Formatter.FormatAndDraw(context, stave, vexNotes);
    };

    render();

    // Перерисовывать при изменении размера экрана
    window.addEventListener("resize", render);

    return () => window.removeEventListener("resize", render);
  }, [notes, currentIndex]);

  return (
    <div
      ref={container}
      style={{
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    ></div>
  );
}
