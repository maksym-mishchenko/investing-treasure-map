import { pgTable, text, integer, boolean, timestamp, uniqueIndex } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  image: text("image"),
  role: text("role").notNull().default("user"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
})

export const progress = pgTable(
  "progress",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    zoneId: integer("zone_id").notNull(),
    completed: boolean("completed").notNull().default(false),
    quizScore: integer("quiz_score"),
    rating: text("rating"),
    completedAt: timestamp("completed_at"),
  },
  (table) => ({
    userZoneIdx: uniqueIndex("user_zone_idx").on(table.userId, table.zoneId),
  })
)

export const badges = pgTable(
  "badges",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    badgeId: text("badge_id").notNull(),
    earnedAt: timestamp("earned_at").notNull().defaultNow(),
  },
  (table) => ({
    userBadgeIdx: uniqueIndex("user_badge_idx").on(table.userId, table.badgeId),
  })
)

export const journalEntries = pgTable(
  "journal_entries",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    zoneId: integer("zone_id").notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    userZoneJournalIdx: uniqueIndex("user_zone_journal_idx").on(table.userId, table.zoneId),
  })
)
