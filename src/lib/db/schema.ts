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
