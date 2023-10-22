import { useState } from "react";
import { Dimensions } from "react-native"

export const useMediaQuery = (minWidth: number, maxWidth: number) => {
  const [width, setWidth] = useState(Dimensions.get('window').width)
  Dimensions.addEventListener('change', (e) => {
    const width = e.window.width;
    setWidth(width);
  })
  if (width > minWidth && width < maxWidth) return true
  else return false
}

export const Mobile = ({ children }: { children: JSX.Element }) => {
  const isMobile = useMediaQuery(0, 767)
  return isMobile ? children : null
}

export const Tablet = ({ children }: { children: JSX.Element }) => {
  const isTablet = useMediaQuery(768, 1023)
  return isTablet ? children : null
}

export const MobileAndTablet = ({ children }: { children: JSX.Element }) => {
  const isMobile = useMediaQuery(0, 1023)
  return isMobile ? children : null
}

export const Desktop = ({ children }: { children: JSX.Element }) => {
  const isDesktop = useMediaQuery(1024, 10000)
  return isDesktop ? children : null
}

export const isDesktop = () => {
  const [width, setWidth] = useState(Dimensions.get('window').width)
  Dimensions.addEventListener('change', (e) => {
    const width = e.window.width;
    setWidth(width);
  })
  if (width > 1024 && width < 10000) return true
  else return false
}
