import Reactfrom, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "../../helpers/helpers";
import { NavlinkData } from "./Navbar";
import CustomButton from "../general/CustomButton";
import { NavLink, useLocation } from "react-router-dom";
interface Props {
  className?: string;
  data: NavlinkData;
}
function NavbarLink({ data, className }: Props) {
  const { pathname } = useLocation();
  const [active, setActive] = useState(false);
  useEffect(() => {
    setActive(pathname === data.to);
  }, [pathname, data.to]);
  return (
    <NavLink to={data.to}>
      <motion.button
        className={cn(
          `group font-light relative w-fit flex-shrink-0 cursor-pointer transition-all ${
            active && "text-primary-500"
          }  `,
          className
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 1.01 }}
      >
        {data.button ? (
          <CustomButton variant={"primary"}>{data.name}</CustomButton>
        ) : (
          data.name
        )}
      </motion.button>
    </NavLink>
  );
}

export default NavbarLink;
