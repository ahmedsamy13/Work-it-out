// ─── Token Helpers ──────────────────────────────────────────────────
// Supabase manages session tokens internally.
// These helpers are kept for edge cases where you need to inspect
// the current session directly.

import { supabase } from "@/shared/lib";

/**
 * Check if a Supabase session currently exists.
 */
export async function hasActiveSession(): Promise<boolean> {
  const { data } = await supabase.auth.getSession();
  return data.session !== null;
}
