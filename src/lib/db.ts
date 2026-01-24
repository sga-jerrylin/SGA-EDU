import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const DB_PATH = path.join(process.cwd(), 'db.json');
const FALLBACK_DB_PATH = path.join(process.cwd(), '.next', 'db.json');

export interface Submission {
  id: string;
  student_name?: string;
  gender?: string;
  birthday?: string;
  phone?: string;
  wechat?: string;
  school?: string;
  grade?: string;
  
  // Student Profile
  role_archetype?: string;
  tech_score?: number;
  leadership_style?: string;
  preferred_track?: string;
  talent_point?: string;
  crisis_reaction?: string;
  weapon_choice?: string;
  logic_test?: string;
  loot_distribution?: string;
  time_commitment?: string;

  // Parent Profile & B-Side Leads
  parent_role?: string;
  parent_age_range?: string;
  parent_education?: string;
  parent_industry?: string;
  parent_job_level?: string;
  invest_style?: string;
  resource_tags?: string;
  pain_point?: string;
  b_side_score?: number;
  is_hot_lead?: boolean;
  success_goal?: string;

  fpa_name?: string;
  fpa_age?: string;
  fpa_gender?: string;
  fpa_score_yellow?: number;
  fpa_score_red?: number;
  fpa_score_blue?: number;
  fpa_score_green?: number;
  fpa_dominant_type?: number;

  // User Profile & Tasks
  password?: string;
  avatar_url?: string;
  mission_started_at?: string;
  mission_completed_at?: string;
  task_progress?: {
    [key: string]: {
      status: 'locked' | 'unlocked' | 'completed';
      screenshot_url?: string;
      unlocked_at?: string;
      completed_at?: string;
    }
  };

  createdAt: string;
  updatedAt: string;
}

function getDb(): Submission[] {
  // Always prefer the primary DB path for consistency
  // If we found a split brain situation (both exist), we prioritize DB_PATH and maybe should warn/sync
  
  try {
    if (fs.existsSync(DB_PATH)) {
      const data = fs.readFileSync(DB_PATH, 'utf-8');
      if (!data.trim()) {
        fs.writeFileSync(DB_PATH, JSON.stringify([]));
        return [];
      }
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error accessing primary database:', error);
  }

  // Only check fallback if primary doesn't exist
  try {
    if (fs.existsSync(FALLBACK_DB_PATH)) {
      const data = fs.readFileSync(FALLBACK_DB_PATH, 'utf-8');
      if (!data.trim()) {
        return [];
      }
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error accessing fallback database:', error);
  }

  // Initialize primary if nothing exists
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify([]));
  } catch (error) {
    console.error('Error creating primary database:', error);
  }

  return [];
}

function saveDb(data: Submission[]) {
  // We should try to save to BOTH to keep them in sync if they both exist, 
  // or just save to the one we are using. 
  // For simplicity and robustness, we write to DB_PATH. 
  // If FALLBACK exists, we update it too to prevent stale reads if we switch back.
  
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving primary database:', error);
  }

  try {
    // Also sync fallback if the directory exists, to avoid confusion
    const dir = path.dirname(FALLBACK_DB_PATH);
    if (fs.existsSync(dir)) {
        fs.writeFileSync(FALLBACK_DB_PATH, JSON.stringify(data, null, 2));
    }
  } catch (error) {
    // Ignore fallback errors
  }
}

export const db = {
  submission: {
    create: async (data: Partial<Submission>) => {
      const db = getDb();
      const newSubmission: Submission = {
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...data,
      } as Submission;
      db.push(newSubmission);
      saveDb(db);
      return newSubmission;
    },
    findMany: async () => {
      return getDb();
    },
    findById: async (id: string) => {
      const db = getDb();
      return db.find(s => s.id === id);
    },
    update: async (id: string, data: Partial<Submission>) => {
      const db = getDb();
      const index = db.findIndex(s => s.id === id);
      if (index === -1) return null;
      
      const updatedSubmission = {
        ...db[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      
      db[index] = updatedSubmission;
      saveDb(db);
      return updatedSubmission;
    },
    delete: async (id: string) => {
      const db = getDb();
      const index = db.findIndex(s => s.id === id);
      if (index === -1) return false;
      db.splice(index, 1);
      saveDb(db);
      return true;
    }
  }
};
