"use client";

import { useState } from "react";

interface UserDeleteBtnProps {
  id: string;
  action: (id: string) => Promise<void>;
}

export function UserDeleteBtn({ id, action }: UserDeleteBtnProps) {
  const [pending, setPending] = useState(false);

  return (
    <form
      action={async () => {
        if (confirm("Eliminare utente?")) {
          setPending(true);
          try {
            await action(id);
          } finally {
            setPending(false);
          }
        }
      }}
    >
      <button
        type="submit"
        disabled={pending}
        className="text-sm text-red-400 hover:text-red-300 disabled:opacity-50"
      >
        Elimina
      </button>
    </form>
  );
}
