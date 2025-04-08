"use client";
import next from "../../public/next.svg";
import Link from "next/link";
import Home from "../../public/house-blank.svg";
import Setting from "../../public/user-gear.svg";
import Heart from "../../public/heart.svg";
import SearchTop from "../../public/search-top.svg";
import Image from "next/image";
import Search from "./Search";
import { useState } from "react"
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/authContext";

const Header = () => {
  const router = useRouter();
  const { user, firebaseSignOut } = useAuth();
  const [isSearch, setIsSearch] = useState(false)
  const iconSize = 20

  const handleLogout = async () => {
    await firebaseSignOut();
    alert("You are logged out");
    router.push("/");
  };

  // todo: change to display name
  const welcome = user ? (
    //<span>welcome {user.uid}</span>
    ''
  ) : (
    //<span>You are not logged in.</span>
    ''
  );

  return (
    <header>
      <nav>
        <div className="logo">ClimApp
        <div className="links">
       
            <Image className="nav-link" alt="Home" src={Home} width={iconSize} onClick={()=>router.push('/')} />

            <Image
                  className={isSearch ? "nav-link search-selected" : "nav-link"}
                  alt="Search"
                  src={SearchTop}
                  width={iconSize}
                  onClick={()=>setIsSearch(!isSearch)}
                />
                {isSearch && <Search/>}
       
          {user && (
            <>
                <Image
                  className="nav-link"
                  alt="Favourites"
                  src={Heart}
                  width={iconSize}
                  onClick={()=>router.push('/favourites')}
                />
         
            
                <Image
                  className="nav-link"
                  alt="Settings"
                  src={Setting}
                  width={iconSize}
                  onClick={()=>router.push('/settings')}
                />
           
            </>
          )}
        </div>
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
