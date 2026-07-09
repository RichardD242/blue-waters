import { useState } from "react";

const STORAGE_KEY = "bluewaters:search-limit";
const DAILY_LIMIT = 5;

interface LimitRecord {
  date: string;
  count: number;
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function readRecord(): LimitRecord {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return { date: today(), count: 0 };
  }
  try {
    const parsed = JSON.parse(raw) as LimitRecord;
    return parsed.date === today() ? parsed : { date: today(), count: 0 };
  } catch {
    return { date: today(), count: 0 };
  }
}

export function useSearchLimit() {
  const [record, setRecord] = useState<LimitRecord>(() => readRecord());

  const remaining = Math.max(0, DAILY_LIMIT - record.count);

  function useSearch(): boolean {
    const current = readRecord();
    if (current.count >= DAILY_LIMIT) {
      setRecord(current);
      return false;
    }
    const next = { date: current.date, count: current.count + 1 };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setRecord(next);
    return true;
  }

  return { remaining, limit: DAILY_LIMIT, useSearch };
}
