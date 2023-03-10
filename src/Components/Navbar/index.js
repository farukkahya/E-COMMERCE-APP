import React from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../contexts/AuthContext";

function Navbar() {
  const { loggedIn } = useAuth();
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Link to={"/"}>eCommerce</Link>
        </div>
        <ul className={styles.menu}>
          <li>
            <Link to={"/"}>Products</Link>
          </li>
        </ul>
      </div>
      <div className={styles.right}>
        {!loggedIn && (
          <ButtonGroup>
            <Link to={"/signin"}>
              <Button colorScheme={"orange"}>
                <FontAwesomeIcon icon={faUser} />
                <span style={{ marginLeft: "5px" }}>Login</span>
              </Button>
            </Link>
            <Link to={"/signup"}>
              <Button colorScheme={"orange"} variant={"outline"}>
                <FontAwesomeIcon icon={faUserPlus} />
                <span style={{ marginLeft: "5px" }}>Register</span>
              </Button>
            </Link>
          </ButtonGroup>
        )}
        {
          loggedIn && (
            <Link to={"/profile"}>
              <Button variant={"outline"} colorScheme={"orange"}>
                <FontAwesomeIcon icon={faUser} />
              </Button>
            </Link>
          )
        }
      </div>
    </nav>
  );
}

export default Navbar;
