import { Logo } from "./Logo";
import { User } from "./User";

export function RootHeader() {
  return (
    <header className="mb-2 flex items-center justify-between border-b border-slate-100 pb-4">
      <Logo />
      <User />
    </header>
  );
}
