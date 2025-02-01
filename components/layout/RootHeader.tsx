import { GeneralUser } from "@/types/auth";
import { Logo } from "./Logo";
import { User } from "./User";

export function RootHeader({ user }: { user: GeneralUser }) {
  return (
    <header className="mb-2 flex items-center justify-between border-b border-slate-100 pb-4">
      <Logo />
      <User user={user} />
    </header>
  );
}
