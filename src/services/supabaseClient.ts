import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variables or localStorage saved credentials
const ENV_URL = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SUPABASE_URL) || '';
const ENV_ANON_KEY = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SUPABASE_ANON_KEY) || '';

let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseCredentials(): { url: string; anonKey: string; isConfigured: boolean } {
  try {
    const saved = localStorage.getItem('bazarbd_supabase_config_v1');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.supabaseUrl && parsed.supabaseAnonKey) {
        return {
          url: parsed.supabaseUrl,
          anonKey: parsed.supabaseAnonKey,
          isConfigured: true,
        };
      }
    }
  } catch (e) {
    console.error(e);
  }

  if (ENV_URL && ENV_ANON_KEY && !ENV_URL.includes('your-project')) {
    return {
      url: ENV_URL,
      anonKey: ENV_ANON_KEY,
      isConfigured: true,
    };
  }

  return {
    url: '',
    anonKey: '',
    isConfigured: false,
  };
}

export function getSupabaseClient(): SupabaseClient | null {
  const { url, anonKey, isConfigured } = getSupabaseCredentials();
  if (!isConfigured) return null;

  if (!supabaseInstance) {
    try {
      supabaseInstance = createClient(url, anonKey);
    } catch (e) {
      console.error('Failed to initialize Supabase client:', e);
      return null;
    }
  }
  return supabaseInstance;
}

export async function testSupabaseConnection(url: string, anonKey: string): Promise<{ success: boolean; message: string; tablesExist: boolean }> {
  try {
    const tempClient = createClient(url, anonKey);
    // Probe products table
    const { data, error } = await tempClient.from('products').select('id').limit(1);

    if (error) {
      // Check if table missing
      if (error.code === '42P01' || error.message.includes('relation "public.products" does not exist') || error.message.includes('does not exist')) {
        return {
          success: true,
          message: 'Connected to Supabase project! However, the database tables have not been created yet. Run the SQL schema in the SQL Editor.',
          tablesExist: false,
        };
      }
      return {
        success: false,
        message: `Connection error: ${error.message}`,
        tablesExist: false,
      };
    }

    return {
      success: true,
      message: 'Supabase connected successfully and tables are ready!',
      tablesExist: true,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || 'Could not connect to Supabase endpoint',
      tablesExist: false,
    };
  }
}
