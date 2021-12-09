import { Button, useColorMode } from "@chakra-ui/react";
import { FaRegMoon, FaRegSun } from "react-icons/fa";

const ToggleButton = function () {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button
      rightIcon={colorMode === "light" ? <FaRegMoon /> : <FaRegSun />}
      onClick={toggleColorMode}
    >
      {colorMode === "light" ? "Dark" : "Light"} Mode
    </Button>
  );
};

export default ToggleButton;
