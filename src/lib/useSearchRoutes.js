import { useRouter, usePathname, useSearchParams } from "next/navigation";

export const useSearchRoutes = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const setParams = ({ name, value }) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    return params.toString();
  };

  const setSearchParameters = ({ search }) => {
    const newParams = setParams({
      name: "search",
      value: search,
    });

    const url = `${pathname}${newParams ? "?" : ""}${newParams}`;
    router.push(url);
  };

  return { setSearchParameters };
};
