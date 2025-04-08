"use client";

import { getFavorites, deleteFavorite } from "../services/dataServices";
import PageTemplate from "../components/PageTemplate";
import Favourite from "../components/Favourite";
import Spacer from "../components/Spacer";
import { LoaderSmall, LoaderBig } from "../components/Loader";
import { useAuth } from "../lib/authContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [favorites, setFavorites] = useState(null);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return;
      const { favorites } = await getFavorites(user.uid);
      setFavorites(favorites);
    };

    fetchFavorites();
  }, [user]);

  const handleDelete = async (favoriteId) => {
    if (!user) return;
    await deleteFavorite(user.uid, favoriteId);

    setFavorites((prev) => prev.filter((fav) => fav.id !== favoriteId));
  };

  const handleSelect = (fav) => {
    const paramStr = fav.lat + "," + fav.lon;
    router.push(`/details/${paramStr}`);
  };

  return (
    <PageTemplate title="Your Favourites">
      <Spacer />
      {!favorites ? (
        <LoaderBig />
      ) : (
        favorites.map((fav) => (
          <Favourite
            key={fav.id}
            name={fav.name}
            country={fav.country || ""}
            onRemove={() => handleDelete(fav.id)}
            onSelect={() => handleSelect(fav)}
          />
        ))
      )}
    </PageTemplate>
  );
};

export default Page;
