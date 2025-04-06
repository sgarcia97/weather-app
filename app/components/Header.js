"use client";
import next from "../../public/next.svg";
import Link from "next/link";
import Home from "../../public/house-blank.svg";
import Setting from "../../public/user-gear.svg";
import Heart from "../../public/heart.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/authContext";

const Header = () => {
  const router = useRouter();
  const { user, firebaseSignOut } = useAuth();

  const handleLogout = async () => {
    await firebaseSignOut();
    alert("You are logged out");
    router.push("/");
  };

  // todo: change to display name
  const welcome = user ? (
    <span>welcome {user.uid}</span>
  ) : (
    <span>You are not logged in.</span>
  );

  return (
    <header>
      <nav>
        <div className="logo">ClimApp | {welcome}</div>
        <div className="links">
          <Link href="/">
            <Image className="nav-link" alt="Home" src={Home} width={20} />
          </Link>
          {user && (
            <>
              <Link href="/favourites">
                <Image
                  className="nav-link"
                  alt="Favourites"
                  src={Heart}
                  width={20}
                />
              </Link>
              <Link href="/settings">
                <Image
                  className="nav-link"
                  alt="Settings"
                  src={Setting}
                  width={20}
                />
              </Link>
            </>
          )}
        </div>
        {user ? (
          <button className="button-small" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button
            className="button-small"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
