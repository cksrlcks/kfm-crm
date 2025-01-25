import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { users } from "./users";

export const companys = pgTable("company", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID())
    .notNull(),
  name: text("name").notNull(),
  contact: text("contact"),
  email1: text("email1"),
  email2: text("email2"),
  email3: text("email3"),
});

export const companysRelations = relations(companys, ({ many }) => ({
  users: many(users),
}));
