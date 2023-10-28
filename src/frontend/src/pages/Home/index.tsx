import React, { useContext } from "react";
import ResponsiveNavbar from "../../common/components/ResponsiveNavbar";
import { Desktop, MobileAndTablet } from "../../hooks/useResposive";
import HomeDesktop from "./HomeDesktop";
import HomeMobile from "./HomeMobile";
import { HomeContext } from "../../contexts/Home/HomeContext";

export default function Home({ searchBookId, bookName }: { searchBookId?: string | null, bookName?: string | null }) {

  const { setInputSearchValue, setBookIdForSearch } = useContext(HomeContext)

  if (searchBookId) {
    setBookIdForSearch(searchBookId)
    if (bookName) {
      setInputSearchValue(bookName)
    }
  }

  return (
    <ResponsiveNavbar>
      <>
        <Desktop>
          <HomeDesktop />
        </Desktop>
        <MobileAndTablet>
          <HomeMobile />
        </MobileAndTablet>
      </>
    </ResponsiveNavbar >
  );
}

