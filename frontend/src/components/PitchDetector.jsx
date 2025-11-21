import { useEffect, useState, useRef } from "react";
import { PitchDetector } from "pitchy";

export default function PitchDetectorComponent({
  onNoteDetected, // callback from parent when note is correct
  currentNote, // the note that user is expected to play
}) {
  const [running, setRunning] = useState(false); // determines if we are listening
  const detectorRef = useRef(null); // stores the pitch detector
  const bufferRef = useRef(null); // stores the audio buffer
  const holdStartRef = useRef(null); // Когда началось удержание правильной ноты

  const HOLD_TIME = 400; // нужно держать ноту 500 мс
  useEffect(() => {
    async function start() {
      setRunning(true); // tells component that detection is active

      // ask user for microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // create audio context for processing
      const audioCtx = new AudioContext();

      // connect microphone audio stream
      const source = audioCtx.createMediaStreamSource(stream);

      // analyzing node used to read audio waveform
      const analyser = audioCtx.createAnalyser();

      analyser.fftSize = 2048; // higher number = more frequency resolution
      source.connect(analyser);

      // create pitch detector matching analyser buffer size
      const detector = PitchDetector.forFloat32Array(analyser.fftSize);
      detectorRef.current = detector;

      // buffer for reading mic waveform
      const buffer = new Float32Array(detector.inputLength);
      bufferRef.current = buffer;

      // MAIN LISTENING LOOP
      function loop() {
        if (!running) return;

        // read audio data from microphone
        analyser.getFloatTimeDomainData(buffer);

        // detect pitch and clarity
        const [pitch, clarity] = detector.findPitch(
          buffer,
          audioCtx.sampleRate
        );

        // only accept clear strong tones
        if (clarity > 0.8) {
          // convert pitch (Hz) → MIDI number
          const midi = Math.round(69 + 12 * Math.log2(pitch / 440));

          // map MIDI → human note name
          const noteNames = [
            "C",
            "C#",
            "D",
            "D#",
            "E",
            "F",
            "F#",
            "G",
            "G#",
            "A",
            "A#",
            "B",
          ];
          const detectedNote = noteNames[midi % 12] + Math.floor(midi / 12 - 1);

          // 🎶 если нота правильная — начинаем отсчёт
          if (detectedNote === currentNote.pitch) {
            if (!holdStartRef.current) {
              holdStartRef.current = performance.now(); // старт удержания
            }

            // Проверяем, держит ли пользователь ноту 500 мс
            const now = performance.now();
            if (now - holdStartRef.current >= HOLD_TIME) {
              onNoteDetected(detectedNote);
              return;
            }
          } else {
            // если нота другая — сброс удержания
            holdStartRef.current = null;
          }
        } else {
          // низкая точность — сброс удержания
          holdStartRef.current = null;
        }

        // repeat loop
        requestAnimationFrame(loop);
      }

      loop(); // start detecting
    }

    start(); // call detector function
  }, [running, currentNote]); // runs when currentNote changes

  return <div style={{ fontSize: 20 }}>🎤 Listening... play</div>;
}
