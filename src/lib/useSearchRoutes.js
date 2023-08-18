/* eslint-disable import/prefer-default-export */
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { addToHistory } from "@/lib/history";

const validateNumber = (value) => {
  const hasType = value.charAt(0) === "<" || value.charAt(0) === ">";
  const valueNumber = hasType ? parseInt(value.slice(1), 10) : value;

  return !Number.isNaN(valueNumber);
};

const getValue = (name, state) => {
  const value = state[name];

  if (name === "followers" || name === "stars") {
    return validateNumber(value) ? value : null;
  }

  return value;
};

export const useSearchRoutes = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const setParameters = (state = {}) => {
    const params = new URLSearchParams(searchParams);

    Object.keys(state).forEach((name) => {
      const value = getValue(name, state);

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
