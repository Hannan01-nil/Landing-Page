"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { HiCheckCircle, HiXCircle, HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";

interface ToastItem {
  id: number;
  message: string;
  type: "success" | "error" | "confirm";
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface ToastCtx {
  toast: (message: string, type?: "success" | "error") => void;
  confirm: (message: string) => Promise<boolean>;
}

const ToastContext = createContext<ToastCtx>({ toast: () => {}, confirm: async () => false });

export function useToast() {
  return useContext(ToastContext);
}

let nextId = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toast = useCallback((message: string, type: "success" | "error" = "success") => {
    const id = nextId++;
    setItems((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setItems((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const confirm = useCallback((message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const id = nextId++;
      setItems((prev) => [
        ...prev,
        {
          id,
          message,
          type: "confirm",
          onConfirm: () => {
            setItems((prev) => prev.filter((t) => t.id !== id));
            resolve(true);
          },
          onCancel: () => {
            setItems((prev) => prev.filter((t) => t.id !== id));
            resolve(false);
          },
        },
      ]);
    });
  }, []);

  function remove(id: number) {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <ToastContext.Provider value={{ toast, confirm }}>
      {children}
      {mounted && createPortal(
        <div className="fixed right-4 top-4 z-[100] flex flex-col gap-2">
          {items.map((item) => (
            <div
              key={item.id}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm shadow-lg backdrop-blur-sm ${
                item.type === "success"
                  ? "bg-green-600 text-white"
                  : item.type === "error"
                  ? "bg-red-600 text-white"
                  : "bg-[#0c1b2a] text-white"
              }`}
            >
              {item.type === "success" && <HiCheckCircle className="text-lg" />}
              {item.type === "error" && <HiXCircle className="text-lg" />}
              <span>{item.message}</span>
              {item.type === "confirm" ? (
                <div className="flex gap-2 ml-4">
                  <button onClick={item.onConfirm} className="rounded bg-white/20 px-3 py-1 text-xs font-semibold hover:bg-white/30">Yes</button>
                  <button onClick={item.onCancel} className="rounded bg-white/10 px-3 py-1 text-xs hover:bg-white/20">No</button>
                </div>
              ) : (
                <button onClick={() => remove(item.id)} className="ml-2"><HiXMark /></button>
              )}
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}
