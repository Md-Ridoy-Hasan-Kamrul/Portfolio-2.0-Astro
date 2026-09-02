import { useState, useEffect, useRef, useCallback } from "react";
import { FiX, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

type ToastType = "success" | "error";
interface ToastItem { id: number; message: string; type: ToastType; }

let _addToast: ((msg: string, type: ToastType) => void) | null = null;

function _toast(message: string, type: ToastType = "success") {
  _addToast?.(message, type);
}
_toast.success = (msg: string) => _toast(msg, "success");
_toast.error = (msg: string) => _toast(msg, "error");

export { _toast as toast };

export function Toaster() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(0);

  const remove = (id: number) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  const add = useCallback((message: string, type: ToastType) => {
    const id = nextId.current++;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => remove(id), 4000);
  }, []);

  useEffect(() => {
    _addToast = add;
    return () => { _addToast = null; };
  }, [add]);

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[99999] flex flex-col gap-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0e0e1a] border border-violet-500/20 shadow-2xl text-sm text-white min-w-[260px]"
          style={{ animation: "slideIn 0.3s ease" }}
        >
          {t.type === "success"
            ? <FiCheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            : <FiAlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />}
          <span className="flex-1">{t.message}</span>
          <button onClick={() => remove(t.id)} className="text-[#8888a8] hover:text-white transition-colors">
            <FiX className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
