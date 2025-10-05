"use client";

import { SignInButton, SignOutButton, useSession } from "@clerk/nextjs";
import { FormEvent } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const { isSignedIn } = useSession();
  const createThumbnail = useMutation(api.thumbnails.createThumbnail);
  const thumbnails = useQuery(api.thumbnails.getThumbnailsForUser);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title");

    if (typeof title === "string") {
      createThumbnail({ title });
    }

    e.currentTarget.reset();
  };

  return (
    <main>
      {isSignedIn ? <SignOutButton /> : <SignInButton />}
      {isSignedIn && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" className="text-white" />
          <button>Create</button>
        </form>
      )}

      {thumbnails?.map((thumbnail) => {
        return <div>{thumbnail.title}</div>;
      })}
    </main>
  );
}
