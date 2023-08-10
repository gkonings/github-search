/* eslint-disable import/prefer-default-export */
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { addToHistory } from "@/lib/history";

export const useSearchRoutes = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const setParameters = (state = {}) => {
    const params = new URLSearchParams(searchParams);

    Object.keys(state).forEach((name) => {
      const value = state[name];
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
    });
    const paramsString = params.toString();

    const url = `${pathname}${paramsString ? "?" : ""}${paramsString}`;
    addToHistory(paramsString);
    router.push(url);
  };

  return { setParameters };
};
