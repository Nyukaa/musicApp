import * as Tone from "tone";
export async function playNote(note) {
  await Tone.start();
  const synth = new Tone.Synth().toDestination();
  synth.triggerAttackRelease(note, "8n");
}
