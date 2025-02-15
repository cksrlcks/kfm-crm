import { authClient } from "@/lib/auth-client";
import { Session, User } from "better-auth";
import { useEffect, useState } from "react";

export default function useSession() {
  const [session, setSeesion] = useState<Session | undefined>(undefined);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function getSession() {
      try {
        const currentSession = await authClient.getSession();
        console.log(currentSession);
        setSeesion(currentSession.data?.session);
        setUser(currentSession.data?.user);
      } catch {
        setSeesion(undefined);
        setUser(undefined);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { session, user, isLoading };
}
