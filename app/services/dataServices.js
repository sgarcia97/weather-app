import { db } from "../lib/firebase";
import {
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

// new favorites
export async function addFavorite(userId, favoriteData) {
  const favoritesRef = collection(db, "users", userId, "favorites");
  const docRef = await addDoc(favoritesRef, {
    ...favoriteData,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

// edit favorites
export async function updateFavorite(userId, favoriteId, updatedData) {
  const docRef = doc(db, "users", userId, "favorites", favoriteId);
  await updateDoc(docRef, updatedData);
}

// delete favorites
export async function deleteFavorite(userId, favoriteId) {
  const docRef = doc(db, "users", userId, "favorites", favoriteId);
  await deleteDoc(docRef);
}

// get favorites (optional pagination)
export async function getFavorites(userId, pageSize = 10, lastVisible = null) {
  try {
    let favQuery = query(
      collection(db, "users", userId, "favorites"),
      orderBy("createdAt"),
      limit(pageSize)
    );

    if (lastVisible) {
      favQuery = query(favQuery, startAfter(lastVisible));
    }

    const querySnapshot = await getDocs(favQuery);
    const favorites = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // for pagination
    return {
      favorites,
      lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1],
    };
  } catch (error) {
    console.error("Error fetching favorites: ", error);
    throw error;
  }
}

// get user info
export async function getUserInfo(userId) {
  try {
    const docSnap = await getDoc(
      doc(db, "users", userId, "user_info", "profile")
    );

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
}

// update user info
export async function updateUserInfo(userId, updatedData) {
  try {
    const docRef = doc(db, "users", userId, "user_info", "profile");
    await setDoc(docRef, updatedData, { merge: true });
  } catch (error) {
    console.error("Error updating user info:", error);
    throw error;
  }
}
