import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

import { useOptionalUser } from "~/utils";

const books = [
  {
    id: 1,
    name: "How to kill a mockingbird",
  },
];

export async function loader({ request }: LoaderArgs) {
  //fetch books harry potter
  let apiUrl = `https://www.googleapis.com/books/v1/volumes?q="harry potter"`;
  let res = await fetch(apiUrl, {
    // headers: {
    //   Authorization: `Bearer ${process.env.API_TOKEN}`,
    // },
  });

  let data = await res.json();
  console.log(data);
  return json(books);
}

export default function Index() {
  console.log("check logs from server to see googleapis response");
  const data = useLoaderData();
  const user = useOptionalUser();
  return (
    <main className="">
      {user ? (
        <Link
          to="/notes"
          className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
        >
          View Notes for {user.email}
        </Link>
      ) : (
        <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
          <Link
            to="/join"
            className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
          >
            Sign up
          </Link>
          <Link
            to="/login"
            className="flex items-center justify-center rounded-md bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600"
          >
            Log In
          </Link>
        </div>
      )}
      <div>
        {data.map((book) => (
          <p key={book.id}>{book.name}</p>
        ))}
      </div>
    </main>
  );
}
