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

  createdAt: string;
  updatedAt: string;
}

function getDb(): Submission[] {
  console.log('Database primary path:', DB_PATH);
  console.log('Database fallback path:', FALLBACK_DB_PATH);

  try {
    if (fs.existsSync(FALLBACK_DB_PATH)) {
      const data = fs.readFileSync(FALLBACK_DB_PATH, 'utf-8');
      if (!data.trim()) {
        console.log('Fallback database file is empty, re-initializing.');
        fs.writeFileSync(FALLBACK_DB_PATH, JSON.stringify([]));
        return [];
      }
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error accessing fallback database:', error);
  }

  try {
    if (fs.existsSync(DB_PATH)) {
      const data = fs.readFileSync(DB_PATH, 'utf-8');
      if (!data.trim()) {
        console.log('Database file is empty, re-initializing.');
        fs.writeFileSync(DB_PATH, JSON.stringify([]));
        return [];
      }
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error accessing primary database:', error);
  }

  try {
    fs.writeFileSync(DB_PATH, JSON.stringify([]));
  } catch (error) {
    console.error('Error creating primary database, trying fallback:', error);
    try {
      const dir = path.dirname(FALLBACK_DB_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(FALLBACK_DB_PATH, JSON.stringify([]));
    } catch (fallbackError) {
      console.error('Error creating fallback database:', fallbackError);
    }
  }

  return [];
}

function saveDb(data: Submission[]) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving primary database, trying fallback:', error);
    try {
      const dir = path.dirname(FALLBACK_DB_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(FALLBACK_DB_PATH, JSON.stringify(data, null, 2));
    } catch (fallbackError) {
      console.error('Error saving fallback database:', fallbackError);
    }
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
