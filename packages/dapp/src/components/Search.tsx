import { FC } from "react";
import Container from "./Container";

type SearchProps = {
  query: string;
  onChange: (value: string) => void;
};

export const Search: FC<SearchProps> = ({ query, onChange }) => {
  return (
    <div className="pointer-events-auto relative bg-white pb-4 shadow-[0_1px_3px_rgba(15,23,42,0.08)] sm:pb-0">
      <Container className="flex flex-col sm:flex-row sm:items-center">
        <div className="relative flex-auto">
          <input
            type="search"
            value={query}
            onChange={e => onChange(e.target.value)}
            aria-label="Search vehicle information"
            placeholder="Search vehicle information"
            className="block border-none focus:border-none w-full appearance-none bg-transparent py-6 pr-4 pl-9 text-base text-slate-900 transition placeholder:text-slate-400 focus:outline-none sm:text-[0.8125rem] sm:leading-6 [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none"
          />
          <svg
            viewBox="0 0 20 20"
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 fill-slate-500 transition"
          >
            <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z" />
          </svg>
        </div>
      </Container>
    </div>
  );
};
