import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// La app corre en "modo demo" (sin backend) cuando estas dos variables no
// están definidas. En ese caso usamos src/lib/mockDataSource.ts en lugar de
// hacer peticiones reales a Supabase.
export const IS_DEMO_MODE = !supabaseUrl || !supabaseAnonKey;

export const supabase: SupabaseClient | null = IS_DEMO_MODE
  ? null
  : createClient(supabaseUrl as string, supabaseAnonKey as string);
