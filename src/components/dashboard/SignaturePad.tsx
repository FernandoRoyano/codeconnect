"use client";

import { useState, useRef, useCallback } from "react";

export default function SignaturePad({ onSave, saved }: { onSave: (data: string) => void; saved: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  const getPos = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const event = "touches" in e ? e.touches[0] : e;
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }, []);

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const ctx = canvasRef.current!.getContext("2d")!;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    setDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawing) return;
    e.preventDefault();
    const ctx = canvasRef.current!.getContext("2d")!;
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = "#194973";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.stroke();
  };

  const endDraw = () => setDrawing(false);

  const clear = () => {
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    setHasDrawn(false);
  };

  const save = () => {
    if (!hasDrawn) return;
    onSave(canvasRef.current!.toDataURL());
  };

  return (
    <div className="flex flex-col gap-3">
      <canvas
        ref={canvasRef}
        width={400}
        height={150}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={endDraw}
        onMouseLeave={endDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={endDraw}
        className={`w-full max-w-[400px] rounded-xl touch-none ${
          saved
            ? "border-2 border-[#71C648] bg-green-50"
            : "border-2 border-dashed border-gray-300 bg-[#f8f9fa] cursor-crosshair"
        }`}
      />
      {!saved && (
        <div className="flex gap-2">
          <button onClick={clear} className="px-4 py-2.5 bg-gray-100 text-[#5A6D6D] rounded-lg font-semibold text-sm hover:bg-gray-200 transition-colors">
            Borrar
          </button>
          <button
            onClick={save}
            disabled={!hasDrawn}
            className={`px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
              hasDrawn ? "bg-[#194973] text-white hover:bg-[#0f3150]" : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Confirmar firma
          </button>
        </div>
      )}
      {saved && <span className="text-[#71C648] font-semibold text-sm">Firma guardada</span>}
    </div>
  );
}
