import { Button, useColorMode } from "@chakra-ui/react";
import { FaRegMoon, FaRegSun } from "react-icons/fa";

const ToggleButton = function () {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button
      rightIcon={colorMode === "light" ? <FaRegMoon /> : <FaRegSun />}
      onClick={toggleColorMode}
      style={{ position: "absolute", right: "0", top: "0" }}
    >
      {colorMode === "light" ? "Dark" : "Light"} Mode
    </Button>
  );
};

export default ToggleButton;
